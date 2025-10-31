
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice/chatSlice';

const useGetRTM = () => {
    const dispatch = useDispatch();
   const {messages} = useSelector(state=>state.chat)
   const {socket} = useSelector(state=>state.socketio)
    useEffect(() => {
        socket?.on("newMessage",(newMessage)=>{
        dispatch(setMessages([...messages, newMessage]))
        } )
        return ()=>{
            socket?.off("newMessage")
        }
    },[messages, setMessages])

       

    return <></>;

}

export default useGetRTM;

