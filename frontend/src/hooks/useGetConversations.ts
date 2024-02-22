import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { UserType } from '../types/user.type';

function useGetConversations() {
  
    const [loading,setLoading] = useState(false);
    const [conversations,setConversations] = useState<UserType[]>([]);  // default value for conversations is an array with a user with id

    useEffect( () => {
        const getConversations = async () =>{
            setLoading(true);
            try {
                const res = await fetch("/api/users");
                const data = await res.json();

                if(data.error){
                    throw new Error(data.error);
                }

                setConversations(data);
            } catch (error:any) {
                toast.error(error.message);
            }
            finally{
                setLoading(false);
            }
        }
        getConversations();
    },[]);

    return {loading,conversations};
}

export default useGetConversations;