import express from "express"
import { connecttodb } from "./db/db.js";
import appRouter from "./routes/route.js";
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/authroute.js";
import cookieParser from "cookie-parser";

const app=express();
const PORT=process.env.PORT || 5000
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.options("*", cors({
    origin: ["https://student-job-tracker-6wae.vercel.app/","http://localhost:5173"], 
    credentials: true,
    options:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],     
}));

app.use(cookieParser())
app.use("/api/v1",appRouter)
app.use("/api/v1/auth",authRouter)

app.listen(PORT,async ()=>{
    await connecttodb()
    console.log(`Listening to port:${PORT}`)
})