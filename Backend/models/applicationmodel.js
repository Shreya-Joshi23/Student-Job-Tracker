import mongoose from "mongoose";

const applicationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    company:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["Applied","Interview","Offer","Rejected"],
            message:"Not a valid value"
        },
        required:true,
        default:"Applied"
    },
    applicationDate:{
        type:Date,
        default:Date.now
    },
    link:{
        type:String,
        required:true
    }
})

const Applications=mongoose.model("Applications",applicationSchema)
export default Applications