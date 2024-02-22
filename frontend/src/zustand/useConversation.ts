import {create} from "zustand";
import { UserType } from "../types/user.type";


type Conversations = {
    selectedConversation: UserType | null,
    setSelectedConversation:(selectedConversation: UserType | null)=> void,
    messages:MessageType[],
    setMessages:(messages:MessageType[]) => void
}


const useConversation = create<Conversations>((set) => ({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages:(messages) => set({messages}),
}));

export default useConversation;