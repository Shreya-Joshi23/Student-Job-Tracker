import jwt from "jsonwebtoken"

export const AuthMiddleware=(req,res,next)=>{
    try{
        console.log(req)
        const token=req.cookies?.cuvette_token;
        console.log("AuthMiddleawre",token)
        if(!token){
            return res.status(400).json({
                message:"Token not found"
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_PASSWORD)
        req.userId=decoded.id
        next();
    }catch(error){
        console.log(error.message)
    }
}