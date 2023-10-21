const express = require('express');
const app = express();
const db= require('./config/monogDB')
const shortURL = require('./models/shortURL')
db()

app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')

app.get('/', async(req,res)=>{
    let urls=await shortURL.find()
    res.render('index.ejs',{urls})
})

app.post('/shorturl', async (req,res)=>{
    await shortURL.create({full:req.body.fullurl})
    res.redirect('/')
})


app.get('/:srturl',async (req,res)=>{
    console.log("iam here",req.params.srturl);
    let myUrls = await shortURL.findOne({short:req.params.srturl});
    if(myUrls){
        myUrls.clicks++
        await myUrls.save();

        res.send(`<script>window.open('${myUrls.full}', '_blank');</script>`);
    }else{
        res.sendStatus(404)
    }
})

app.listen(process.env.PORT||5000,()=>{
    console.log("server running at port");
})