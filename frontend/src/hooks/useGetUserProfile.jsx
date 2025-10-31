import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuserProfile } from '../redux/authSlice';

const useGetUserProfile = (userId) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/user/${userId}/profile`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setuserProfile(res.data.user))


                }
            } catch (error) {
                console.error(error);

            }
        }
        fetchUserProfile();
    }, [userId])


}

export default useGetUserProfile;