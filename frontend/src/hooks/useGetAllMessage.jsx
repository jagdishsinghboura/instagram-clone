import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice/chatSlice';

const useGetAllMessage = () => {

    const dispatch = useDispatch();
    const {selectedUser} =useSelector(state=>state.auth);

    useEffect(() => {

        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/message/all/${selectedUser?._id}`, {
                    withCredentials: true,
                })
                

                if (res.data.success) {
                    dispatch(setMessages(res.data.messages))

                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllMessage();
    }, [selectedUser,dispatch])


    return <></>;

}

export default useGetAllMessage;

