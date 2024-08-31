import React from 'react'
import Avatar from '../Avatar'
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import SuggestedUser from './SuggestedUser';
import useGetSuggestedUser from '../../hooks/useGetSuggestedUser';


export default function RightSidebar() {
    useGetSuggestedUser();
    const { user } = useSelector(store => store.auth);
    return (
        <div className='my-8 w-full max-w-sm mx-auto  '>

            <div className='w-[90%]'>
                <div className='flex items-center justify-between p-4 '>
                    <div className='flex items-center gap-4'>
                        <Link  to={`/profile/${user?._id}`}>  <Avatar h={8} w={8} src={user?.profilePicture} className="text-center" /></Link>
                        <div className='flex flex-col gap-2'>
                            <Link to={`/profile/${user?._id}`}>
                                <h1 className='font-semibold hover:cursor-pointer'>{user?.username}</h1>
                            </Link>
                            <p className='text-slate-400 text-sm'>{user?.bio}</p>
                        </div>
                    </div>
                    <button className='text-blue-500 hover:text-blue-800'>switch</button>

                </div>
               <SuggestedUser/>
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
