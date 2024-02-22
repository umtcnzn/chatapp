import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';

function Message({message}:{message:MessageType}) {


    const {selectedConversation} = useConversation();
    const {authUser} = useAuthContext();

    const isReceiver = selectedConversation?._id === message.receiverId;

    const bubbleBgColor = isReceiver ? "bg-blue-600" : ""

  return (
    <div className={`chat ${isReceiver ? "chat-end" : "chat-start"}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img alt='chat bubble' src={isReceiver? authUser.profilePic:selectedConversation?.profilePic}/>
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} mb-0.5`}>
            {message.message}
        </div>
        <div className='chat-footer opacity-60 text-xs flex gap-1 items-center text-gray-400'>
            {extractTime(message.createdAt)}
        </div>
    </div>
  )
}

export default Message