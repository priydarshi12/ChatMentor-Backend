const mongoose=require('mongoose')
const colors =require('colors')


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log("mongoDB coonectes")
    }
    catch(err){
    console.log(`error in mongoBD connection ${err}`)
    }
}


module.exports=connectDB