import {connect} from "mongoose"

export const connecttodb=async ()=>{
    try{
        await connect(process.env.MONGO_URL)
        console.log("Connected to database")
    }catch(error){
        console.log("Cannot connect to datbase",error.message)
    }
}