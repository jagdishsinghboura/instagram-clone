import React, { useState } from 'react'
import Avatar from '../Avatar'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SuggestedUserCard from './SuggestedUserCard'

export default function SuggestedUser() {
    const { suggestedUsers } = useSelector(state => state.auth)
    const navigate = useNavigate();

    const handleProfileNevigation = (id, username) => {

        navigate(`/profile/${id}`)
    }



    return (
        <>
            <div className='flex items-center justify-between w-full  p-2  m-2'>
                <h1 className='text-gray-400 text-base '> suggest for you</h1>
                <p className='hover:text-gray-400 hover:cursor-pointer'>See All</p>
            </div>
            <div>
                {suggestedUsers.map((user) => {
                    return <SuggestedUserCard key={user._id}  selectedSuggUser={user}/>
                })}
            </div>
        </>

    )
}
