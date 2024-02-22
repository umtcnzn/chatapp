import React, { useState } from 'react'
import { LoginUser } from '../types/user.type';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function useLogin() {
  const [loading,setLoading] = useState(false);

  const {setAuthUser} = useAuthContext();

  const login = async (inputs:LoginUser) => {

    const success = handleInputErrors(inputs);
    if(!success) return;

    setLoading(true);
    try {
        const res = await fetch("/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(inputs)
        });
        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.setItem("authUser", JSON.stringify(data));
        setAuthUser(data);
    } catch (error:any) {
        toast.error(error.message)
    } finally{
        setLoading(false);
    }
  }
  
  return {loading,login};
  
}

export default useLogin;



function handleInputErrors(inputs:LoginUser){

    if(!inputs.username || !inputs.password){
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}