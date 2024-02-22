import { useState } from "react";
import { SignupUser } from "../types/user.type";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async (inputs:SignupUser) =>{
        const success = handleInputErrors(inputs);
        if(!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(inputs)
            })
            const data = await res.json();
            
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("authUser",JSON.stringify(data));
            setAuthUser(data);

        } catch (error:any) {
            toast.error(error.message)
        } finally{
            setLoading(false);
        }
    }

    return {loading, signup}
}
 
export default useSignup;


function handleInputErrors(inputs:SignupUser){

    if(!inputs.fullName || !inputs.username || !inputs.password || !inputs.confirmPassword || !inputs.gender){
        toast.error("Please fill in all fields");
        return false;
    }

    if(inputs.password !== inputs.confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }

    if(inputs.password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}