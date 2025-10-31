import React, { useState } from 'react'
import Avatar from '../Avatar'
import useGetUserProfile from '../../hooks/useGetUserProfile'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { MdPerson } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useActionState } from 'react';
import useGetSuggestedUser from '../../hooks/useGetSuggestedUser';
import { setAuthUser, setuserProfile } from '../../redux/authSlice';

export default function Profile() {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");
  const dispatch =useDispatch()


  const { userProfile, user } = useSelector(state => state.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const [isFollowing, setIsFollowing] =useState(user?.following?.includes(userId) ||false) ;



  const handlerTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === "posts" ? userProfile?.post : userProfile?.bookmarks

  const handleFollowUnFollow=async ()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/user/followorunfollow/${userId}`,
         { withCredentials: true }
      )
        if(data.success){
          setIsFollowing(!isFollowing);
          toast.success(data.message)
          dispatch(setAuthUser(data.user.authUser))
          dispatch(setuserProfile(data.user.otherUser))
          useGetSuggestedUser();
           
        }
    }
  return (
    <div className='flex flex-row  h-screen  mx-auto '>

      <div className='flex flex-col gap-5 w-full'>
        <div className='flex  flex-col  w-4/5'>
          <section className='w-full gap-2 flex justify-center mx-auto max-w-3xl'>
            <div className='grid grid-cols-2   gap-20 p-8'>
              <div className='flex place-items-center p-1  '>
                {userProfile?.profilePicture ?
                  <div className=' rounded-full'>
                    <img src={userProfile?.profilePicture} className=' rounded-full h-60 w-60 object-cover' />
                  </div>
                  : <MdPerson className=' text-white bg-gray-400 h-52 w-52 rounded-full -p-1' size={96} />
                }


              </div>
              <section className='text-base  flex justify-center  items-center p-2 m-2'>
                <div className='flex flex-col gap-5'>
                  <div className='flex flex-col'>
                    <h1 className='text-xl font-sans w-full py-2 px-2 capitalize'>{userProfile?.username}</h1>
                    {

                      isLoggedInUserProfile ?
                        <div className='flex gap-2'>
                          <Link to={"/account/edit"}> <button className='bg-slate-300 p-1 rounded-lg text-sm font-medium' > Edit Profile</button></Link>
                          <button className='bg-slate-300 p-1 rounded-lg text-sm font-medium' > View Archieve</button>
                          <button className=' ' >
                            <CiSettings className='text-3xl' />
                          </button>
                        </div>
                        : (
                          isFollowing ?
                            <>
                              <div className='flex  text-lg font-serif gap-2 my-2 '>
                                <button onClick={handleFollowUnFollow} className='  rounded-md w-40 font-sans bg-slate-200 hover:scale-105 transition-transform ' > unfollow</button>
                                <button className=' rounded-md w-40  font-sans  bg-slate-200  hover:scale-105 transition-transform ' > message</button>
                              </div>

                            </> :
                            <>
                            <div className='flex  text-lg font-serif gap-2 my-2 '>
                                <button onClick={handleFollowUnFollow} className='  rounded-md w-40 font-sans bg-slate-200 hover:scale-105 transition-transform ' > follow</button>
                                <button className=' rounded-md w-40  font-sans  bg-slate-200  hover:scale-105 transition-transform ' > message</button>
                              </div>
                            </>
                        )
                    }

                  </div>
                  <div className='flex gap-4 items-center justify-between'>
                    <p><span className='font-semibold font-serif'> {userProfile?.post?.length}</span> posts</p>
                    <p><span className='font-semibold font-serif'> {userProfile?.following?.length} </span>following</p>
                    <p> <span className='font-semibold font-serif'>{userProfile?.followers?.length}</span> followers</p>
                  </div>
                  <div className='flex flex-col gap1'>
                    <span className='font-medium font-sans inset-5 '>{userProfile?.bio}</span>
                    
                  </div>
                </div>
              </section>
            </div>

          </section>
        </div>
        <div className='border-t-gray-500 border-t w-full'>
          <div className='flex items-center justify-center gap-10 text-sm font-semibold'>
            <span onClick={() => handlerTabChange("posts")} className={` py-3 cursor-pointer ${activeTab === "posts" ? "font-bold border-b-black border-b-2" : ""}`}>
              POSTS
            </span>
            <span onClick={() => handlerTabChange("saved")} className={` py-3 cursor-pointer ${activeTab === "saved" ? "font-bold border-b-black border-b-2" : ""}`}>
              SAVED
            </span>
            
            <span onClick={() => handlerTabChange("tags")} className={` py-3 cursor-pointer`}>
              TAGS
            </span>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4 m-4'>
          {
            displayedPost?.map((post) => {
              return <div key={post?._id} className='relative group cursor-pointer p-2'>
                <img src={post?.image} alt="postImage" className='rounded-md aspect-square object-fill' />
                <div className='rounded absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='flex items-center text-white space-x-4'>
                    <span className='text-2xl text-cetner flex flex-row justify-center items-center gap-1'><FaRegHeart /> {post?.likes?.length}</span>
                    <span className='text-2xl text-cetner flex flex-row justify-center items-center gap-1'><FaRegComment /> {post?.comments?.length}</span>

                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>

    </div>
  )
}
