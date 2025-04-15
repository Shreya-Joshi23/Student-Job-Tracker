import Router from "express"
import {signupuser,signinuser,logoutuser, checkToken} from "../controllers/Auth.js"

const authRouter=Router()

authRouter.get("/",()=>{
    console.log("AuthRouter working")
})
authRouter.post("/signup",signupuser)
authRouter.post("/signin",signinuser);
authRouter.post("/logout",logoutuser);
authRouter.get("/isAuth",checkToken)
export default authRouter