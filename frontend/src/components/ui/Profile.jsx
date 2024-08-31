import React, { useState } from 'react'
import Avatar from '../Avatar'
import useGetUserProfile from '../../hooks/useGetUserProfile'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

export default function Profile() {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector(state => state.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = true;



  const handlerTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === "posts" ? userProfile?.post : userProfile?.bookmarks

  return (
    <div className='flex flex-row  h-screen  mx-auto '>

      <div className='flex flex-col gap-5 w-full'>
        <div className='flex  flex-col  w-4/5'>
          <section className='w-full gap-2 flex justify-center mx-auto max-w-3xl'>
            <div className='grid grid-cols-2  p-8'>
              <div className='flex place-items-center p-1  '>
                <img src={userProfile?.profilePicture ||"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt=" profile picture" className=' h-36 w-36 object-cover rounded-full border-red-500 border-2 ' />
              </div>
              <section className='text-base'>
                <div className='flex flex-col gap-5'>
                  <div className='flex items-center justify-center gap-4'>
                    <span>{userProfile?.username}</span>
                    {
                      isLoggedInUserProfile ?
                        <div className='flex gap-2'>
                          <Link to={"/account/edit"}> <button className='bg-slate-300 p-1 rounded-lg text-sm font-medium' > Edit Profile</button></Link>
                          <button className='bg-slate-300 p-1 rounded-lg text-sm font-medium' > View Aarchieve</button>
                          <button className=' ' >
                            <CiSettings className='text-3xl' />
                          </button>
                        </div>
                        : (
                          isFollowing ?
                            <>
                              <button className='bg-slate-400  p-1 rounded-lg  ' > unfollow</button>
                              <button className='bg-[#0095F6] p-1 rounded-lg  hover:bg-[#0976bf]' > message</button>
                            </> :
                            <>
                              <button className='bg-[#0095F6] p-1 rounded-lg  hover:bg-[#0976bf]' > Follow</button>
                              <button className='bg-[#0095F6] p-1 rounded-lg  hover:bg-[#0976bf]' > ...</button>
                            </>
                        )
                    }

                  </div>
                  <div className='flex gap-4 items-center'>
                    <p><span className='font-semibold'> {userProfile?.post?.length}</span> posts</p>
                    <p><span className='font-semibold'> {userProfile?.following?.length} </span>following</p>
                    <p> <span className='font-semibold'>{userProfile?.followers?.length}</span> followers</p>
                  </div>
                  <div className='flex flex-col gap1'>
                    <span className='font-semibold'>{userProfile?.bio || "bio here"}</span>
                    <span>Learn Code with me merstack style</span>
                    <span>Dm for collboration</span>
                    <span>Learn with me </span>
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
            <span onClick={() => handlerTabChange("reels")} className={` py-3 cursor-pointer`}>
              REELS
            </span>
            <span onClick={() => handlerTabChange("tags")} className={` py-3 cursor-pointer`}>
              TAGS
            </span>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {
            displayedPost?.map((post) => {
              return <div key={post._id} className='relative group cursor-pointer'>
                <img src={post?.image} alt="postImage" className='rounded-md aspect-square object-cover' />
                <div className='rounded absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='flex items-center text-white space-x-4'>
                    <span className='text-2xl text-cetner flex flex-row justify-center items-center gap-1'><FaRegHeart /> {post.likes.length}</span>
                    <span className='text-2xl text-cetner flex flex-row justify-center items-center gap-1'><FaRegComment /> {post.comments.length}</span>

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
