import React, { useEffect, useRef } from 'react'
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {

  const {messages,loading} = useGetMessages();

  useListenMessages();
  
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    setTimeout(()=> {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },100);
  },[messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length === 0 && (
          <p className='text-center'>Send a message to start the conversation</p>
        )}

        {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx} />)}


        {!loading && messages.length !== 0 && (
          messages.map((message,idx) => {
            return <div ref={lastMessageRef}><Message message={message} key={idx}/></div>
          })
        )}
    </div>
  )
}

export default Messages;