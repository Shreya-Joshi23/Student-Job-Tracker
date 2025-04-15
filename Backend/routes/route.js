import Router from "express"
import {postapplication,getapplications,updateapplication,deleteapplication} from "../controllers/applications.js"
import { AuthMiddleware } from "../middleware/AuthMiddleware.js"

const appRouter=Router()

appRouter.get("/",()=>{
    console.log("AppRouter working")
})
appRouter.post("/addapplication",AuthMiddleware,postapplication)
appRouter.get("/getapplications",AuthMiddleware,getapplications);
appRouter.patch("/updatestatus/:id",AuthMiddleware,updateapplication);
appRouter.delete("/deleteapplication/:id",AuthMiddleware,deleteapplication)

export default appRouter