import { useSetRecoilState } from "recoil"
import userState from "../atom/useratom"
import { useEffect } from "react"
import axios from "axios"

const AuthProvider=({children})=>{
    const setuser=useSetRecoilState(userState)
    useEffect(()=>{
        console.log("I am AuthProvider")
        const fetchUser=async ()=>{
            try{
                const result=await axios.get(`${process.env.BACKEND_URL}/api/v1/auth/isAuth`,{
                    withCredentials:true
                });
                console.log(result)
                console.log(result.data.user)
                setuser({
                    isLoading:false,
                    isAuthenticated:true,
                    user:result.data.user
                })
            }catch(error){
                console.log(error.message)
                setuser({
                    isLoading:false,
                    isAuthenticated:false,
                    user:null
                })
            }
        };
        fetchUser()
    },[setuser])

    return children;
}

export default AuthProvider;