import { createContext, useContext, useState } from "react";
import { UserType } from "../types/user.type";


export interface AuthContextType {
    authUser: UserType; 
    setAuthUser: React.Dispatch<React.SetStateAction<any>>; 
}


const AuthContext = createContext<AuthContextType>({authUser: {_id:"",username:"",fullName:"",profilePic:""},setAuthUser: () => {} });


export function useAuthContext(){
    return useContext(AuthContext);
}


export const AuthContextProvider = ({children}:{children:React.ReactNode}) =>{

    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("authUser")!) || null)

    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>
}