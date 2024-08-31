import React from 'react'
import Avatar from '../Avatar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function SuggestedUser() {
    const { suggestedUsers } = useSelector(state => state.auth)
        const navigate = useNavigate();

    const handleProfileNevigation=(id, username)=>{
        console.log(username);
        
        navigate(`/profile/${id}`)
    }

    return (
        <>
            <div className='flex items-center justify-between w-full  p-2  '>
                <h1 className='text-gray-400 text-base '> suggest for you</h1>
                <p className='hover:text-gray-400 hover:cursor-pointer'>See All</p>
            </div>
            {suggestedUsers.map((user) => {
                return <div key={user?._id}>
                    <div className='flex items-center justify-between my-3 '>
                        <div className='flex items-center gap-3 p-3'>
                            <Avatar h={8} w={8} src={user?.profilePicture} />
                            <div>
                                <button onClick={()=>handleProfileNevigation(user?._id, user?.username)}>
                                    <h1 className='font-semibold hover:cursor-pointer'>{user?.username}</h1>
                                </button>
                                <p className='text-slate-400 text-sm'>seggested for you </p>
                            </div>
                        </div>
                        <button className='text-blue-500 hover:text-blue-800'>follow</button>

                    </div>

                </div>
            })}
        </>

    )
}
