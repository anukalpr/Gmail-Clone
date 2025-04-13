const mongoose=require('mongoose');

const conn=async()=>{
    const DB_URI='mongodb+srv://anukalprajcs22:Anu%4062030@gmailclone.qaapz.mongodb.net/?retryWrites=true&w=majority&appName=gmailclone';
    try{
       await mongoose.connect(DB_URI,{
        })
        console.log("DataBase is connected successfully");
    }
    catch(error){
        console.log(error);
        console.log('Error aa rhi hai',error.message);
    }
}
module.exports=conn;
