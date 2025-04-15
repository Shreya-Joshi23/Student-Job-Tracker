import mongoose from "mongoose";

const Usermodel=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
})

const Users=mongoose.model("Users",Usermodel)
export default Users