import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar';
import { setSelectedUser } from '../../redux/authSlice';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Messages from './Messages';
import axios from "axios"
import { setMessages } from '../../redux/messageSlice/chatSlice';

export default function ChatPage() {
    const { user, suggestedUsers, selectedUser } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { onlineUsers } = useSelector(state => state.chat)
    const [textMessage, setTextMessage] = useState("");
    const { messages } = useSelector(state => state.chat)

    const sendMessageHandler = async (receiverId) => {
        try {
            
            
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/message/send/${receiverId}`, {
               message: textMessage
            },
                {
                    headers: {
                        'Content-Type': "application/json"
                    },
                    withCredentials: true,
                })
                
                if (res.data.success) {
                    const newMessage = [...messages,res.data.newMessage ]
                    dispatch(setMessages(newMessage));
                   setTextMessage("");
            }

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null))
        }
    },[])
    return (
        <div className=' flex  h-screen border-l-2  '>
            <section className='w-[30%]'>
                <h1 className='font-bold mb-4 px-3 text-xl m-6 p-1'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />
                <div className=' overflow-y-scroll scrollbar-hide h-[84vh] '>
                    {
                        suggestedUsers?.map((suggestUser) => {
                            const isOnline = onlineUsers.includes(suggestUser?._id);

                            return (
                                <div onClick={() => dispatch(setSelectedUser(suggestUser))} key={suggestUser?._id} className='flex  items-center gap-3 hover:bg-gray cursor-pointer m-4 my-5 py-2'>
                                    <div className='flex  items-center justify-center'>
                                        <Avatar h={12} w={12} url={suggestUser?.profilePicture} />
                                    </div>
                                    <div className='flex flex-col p-1'>
                                        <span className='font-medium '>{suggestUser?.username}</span>
                                        <span className={`text-sm ${isOnline ? "text-green-500" : "text-red-500"}`}>{isOnline ? "online" : "offline"}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {
                selectedUser ? (
                    <section className='flex-1 border-1-gray-300 flex flex-col h-full m-4'>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                            <Avatar h={12} w={12} url={selectedUser?.profilePicture} />
                        </div>
                        <div className='flex flex-col'>
                            <span className=''>{selectedUser?.username || "jskd"}</span>
                        </div>
                        <Messages selectedUser={selectedUser} />
                        <div className='flex items-center p-4 border-t border-t-gray-300 mb-10'>
                            <input type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} className='flex-1 mr-2 focus-vid
                    ring-transparent ' placeholder='messages...' />
                            <button onClick={() => sendMessageHandler(selectedUser?._id)}className='p-1 bg-blue-700 px-3 rounded-lg'>send</button>
                        </div>
                    </section>
                ) : (
                    <div className=' flex items-center justify-center h-screen  w-full mx-auto'>
                        <div>
                            <IoChatbubbleEllipsesSharp className='text-9xl w-full text-center' />
                            <h1 className='w-full text-center font-medium text-xl'>your message</h1>
                            <span>send a message to start a chat</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
