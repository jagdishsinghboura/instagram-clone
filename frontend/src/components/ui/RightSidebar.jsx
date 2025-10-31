import React from 'react'
import Avatar from '../Avatar'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import SuggestedUser from './SuggestedUser';
import useGetSuggestedUser from '../../hooks/useGetSuggestedUser';


export default function RightSidebar() {
    useGetSuggestedUser();
    const { user } = useSelector(store => store.auth);
    return (
        <div className='my-8 w-full max-w-sm mx-auto min-h-screen '>

            <div className='w-[90%]  '>
                <div className='flex items-center justify-between p-4 border-b-2'>
                    <div className='flex flex-col items-center gap-4 w-full'>
                        <Link to={`/profile/${user?._id}`} className='flex  w-full   justify-between '>
                            <Avatar h={8} w={8} src={user?.profilePicture} className="text-center" />
                            <h1 className='font-semibold hover:cursor-pointer text-base  pt-2'>{user?.username}</h1>
                            <button className='text-blue-500 hover:text-blue-800'>switch</button>
                        </Link>
                        <div className='flex flex-col gap-2'>
                            <p className='text-slate-400 text-sm'>{user?.bio}</p>
                        </div>
                    </div>

                </div>
                <SuggestedUser />
            </div>

            <div className='pt-5 pl-5'>

                <ul className='text-xs text-gray-400 flex gap-1 p-1'>
                    <li>About</li>
                    <li> Help</li>
                    <li> Press</li>
                    <li>API</li>
                    <li>  Jobs</li>
                    <li>  Privacy</li>
                    <li>Terms</li>

                </ul>
                <ul className='text-xs text-gray-400 flex gap-1 '>
                    <li>Locations</li>
                    <li>Language</li>
                    <li> Meta Verified</li>

                </ul>
                <p className='text-xs text-gray-400 flex gap-1 p-1'>© 2024 Instagram from Meta</p>
            </div>

        </div>
    )
}
