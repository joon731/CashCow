const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://root:password1234@cluster0.tqxkiwp.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection

