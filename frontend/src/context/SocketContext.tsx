import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { Socket, io } from "socket.io-client";


type SocketContextType = {
    socket:Socket | null,
    onlineUsers:string[]
}


const SocketContext = createContext<SocketContextType>({socket:null,onlineUsers:[]});

export const useSocketContext = () =>{
    return useContext(SocketContext);
}


export const SocketContextProvider = ({children}:{children:React.ReactNode}) => {

    const [socket,setSocket] = useState<Socket | null>(null);
    const [onlineUsers,setOnlineUsers] = useState([]);

    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser){
            const socket = io("http://localhost:5000",{
                query:{
                    userId:authUser._id,
                }
            })
            setSocket(socket);

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })
            
            return () => {socket.close(); setSocket(null);};
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
},[authUser])

    return (
        <SocketContext.Provider value={{socket,onlineUsers}} >
            {children}
        </SocketContext.Provider>
    )
}