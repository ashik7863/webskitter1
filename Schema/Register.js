const mongoose=require('mongoose');
const RegisterSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String
})

module.exports=mongoose.model('user',RegisterSchema);