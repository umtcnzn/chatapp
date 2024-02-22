import React from 'react'
import { UserType } from '../../types/user.type'
import useConversation from '../../zustand/useConversation'

function Conversation({conversation,lastIndex}:{conversation:UserType,lastIndex:boolean}) {

    const {selectedConversation,setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id

  return (<>
    <div onClick={()=> setSelectedConversation(conversation)} className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 
    cursor-pointer ${isSelected ? "bg-sky-500": ""}`}>
        <div className='avatar online'>
            <div className='w-12 rounded-full'>
                <img src={conversation.profilePic} alt='user avatar'/>
            </div>
        </div>

        <div className="flex flex-col flex-1">
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200 capitalize'>{conversation.fullName.toLowerCase()}</p>
                <span className="text-xl">🤪</span>
            </div>
        </div>

    </div>
    
    {!lastIndex && <div className='divider my-0 py-0 h-1'></div>}
    </>
  )
}

export default Conversation