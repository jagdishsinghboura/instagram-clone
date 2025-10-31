import React, { useState } from 'react'
import Avatar from '../Avatar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import useGetSuggestedUser from '../../hooks/useGetSuggestedUser'
import useGetUserProfile from '../../hooks/useGetUserProfile'
import { setAuthUser, setuserProfile } from '../../redux/authSlice'

export default function SuggestedUserCard({ selectedSuggUser }) {

    const { user } = useSelector(state => state.auth)
    const [isFollowing, setIsFollowing] = useState(user?.following.includes(selectedSuggUser._id) || false)
    const dispatch = useDispatch();


    const handleFollowUnFollow = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/user/followorunfollow/${selectedSuggUser._id}`,
            { withCredentials: true }
        )
        if (data.success) {
            setIsFollowing(!isFollowing);
            toast.success(data.message)
            dispatch(setAuthUser(data.user.authUser))
            useGetSuggestedUser();
        } else {
            toast.error(data.message)
        }
    }

    return (
        <div key={selectedSuggUser?._id}>
            <div className='flex items-center justify-between  '>
                <Link to={`/profile/${selectedSuggUser._id}`}>
                    <div className='flex items-center gap-3 p-3'>
                        <Avatar h={8} w={8} src={selectedSuggUser?.profilePicture} />
                        <div>
                            <button onClick={() => handleProfileNevigation(selectedSuggUser?._id, selectedSuggUser?.username)}>
                                <h1 className='font-semibold hover:cursor-pointer'>{selectedSuggUser?.username}</h1>
                            </button>
                            <p className='text-slate-400 text-sm'>seggested for you </p>
                        </div>
                    </div>
                </Link>
                <button onClick={handleFollowUnFollow} className={`text-blue-500 hover:text-blue-800`}>{!isFollowing ? "follow" : "unfollow"}</button>

            </div>

        </div>
    )
}
