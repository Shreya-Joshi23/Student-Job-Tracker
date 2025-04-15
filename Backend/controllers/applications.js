import Applications from "../models/applicationmodel.js"

export const postapplication=async (req,res)=>{
    // need to take comapny,role,status,link
    const {company,role,status,link}=req.body;
    const userId=req.userId;
    try{
        // check if this company and role alreasy exist
        const application=await Applications.create({
            userId:userId,
            company,
            role,
            status,
            link
        })
        res.status(200).json({
            message:"Application created successfully",
            application
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

export const getapplications=async (req,res)=>{
    try{
        const applications=await Applications.find({userId:req.userId});
        res.status(200).json({
            message:"Applciations fetched successfully",
            applications
        })
    }catch(error){
        res.status(500).json({
            message:"Internal server error"||error.message
        })
    }
}

export const updateapplication=async (req,res)=>{
    const {id}=req.params;
    console.log(id)
    const {status}=req.body
    console.log(id)
    try{
        const application = await Applications.findOneAndUpdate({ _id: id, userId: req.userId },req.body)
        console.log(application)
        if(!application){
            res.status(400).json({
                message:"Application does not exist for this company and role"
            })
            return;
        }
        res.status(200).json({
            message:"Application updated successfully"
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

export const deleteapplication=async (req,res)=>{
    const {id}=req.params;
    try{
        const application=await Applications.findOneAndDelete({ _id: id, userId: req.userId })
        if(!application){
            res.status(400).json({
                message:"Application not present"
            })
        }
        res.status(200).json({
            message:"Application deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            message:"Internal server error"||error.message
        })
    }
}

