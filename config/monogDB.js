const mongoose=require('mongoose');
require('dotenv').config()


const db = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = db