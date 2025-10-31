import React from 'react'
import Avatar from '../Avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllMessage from '../../hooks/useGetAllMessage'
import useGetRTM from '../../hooks/useGetRTM'

export default function Messages({selectedUser}) {
  useGetAllMessage();
  useGetRTM()
  const {messages} =useSelector(state=>state.chat);
  const {user} =useSelector(state=>state.auth);
  
  


  return (
    <div className='overflow-y-auto flex-1 p-4'>
      <div className='flex justify-center   flex-col'>
          <div className='flex flex-col items-center justify-center '>
          <div className='flex justify-center items-center'>
            <img src={selectedUser?.profilePicture||"https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" className='rounded-full h-12 w-12 object-cover' />
          </div>
          <span>{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}><button  className='h-8 my-2 px-5 rounded-lg bg-slate-200'>view Profile</button></Link>
          </div>
      </div>
      <div className='flex flex-col gap-3'>
       {
        messages?.map((msg)=>(
          <div key={msg._id} className={`flex   res.clearCookie("token")  ${msg.senderId ===user?._id?"justify-end ":"justify-start"}`}>
          <div className={` m-1 p-1 px-2 rounded-lg max-w-xs break-words ${msg.senderId===user?._id?"bg-blue-500 text-white":"bg-gray-200 text-black"}`} >
              {
              }
              {msg?.message}
            </div>
          </div>
        ))
       }
      </div>
    </div>
  )
}
