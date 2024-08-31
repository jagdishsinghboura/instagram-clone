import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { PiTelegramLogoThin } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setPosts, setSelectedPost } from '../../redux/postSlice';
import Comments from '../Comments';


export default function Post({ post }) {
    const [text, setText] = useState("");
    const [isCommentBox, setIsCommentBoxisCommentBox] = useState(false);
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    const { posts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLikeCount, setPostLikedCount] = useState(post.likes.length);
    const {selectedPost}=useSelector(state=>state.post)
    const [comment, setComment] = useState(selectedPost?.comments)
    const chageEventHandler = (e) => {
        const inputText = e.target.value;

        if (inputText.trim()) {
            setText(inputText)
        } else {
            setText("");
        }

        setText(e.target.value)
    }

    useEffect(()=>{
        if(selectedPost){
            setComment(selectedPost.comments)
        }
    },[selectedPost])

    const toggleDialog = () => {
        setIsCommentBoxisCommentBox(!isCommentBox);
        console.log("jasdfnjaksnfjl");


    }

    const toggleMore = () => {
        setIsMoreMenuOpen(!isMoreMenuOpen);
    }

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, {
                withCredentials: true
            })
            if (res.data.success) {
                const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id)
                dispatch(setPosts(updatedPostData))
                toast.success(res.data.message);

            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

        }
    }

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? "dislike" : 'like';
            console.log(postLikeCount);
            console.log(liked);
            
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post?._id}/${action}`, {
                withCredentials: true,
            });
            
            
            if (res.data.success) {
                console.log("sijdf");
                               
                const updatedLikes = liked ? postLikeCount - 1 : postLikeCount + 1;
                setPostLikedCount(updatedLikes);
                setLiked(!liked);

                const updatedPostData = posts.map(p => p._id === post._id ? {
                    ...p,
                    likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                } : p);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the like status.");
        }
    };

    const bookMarkhandler=async ()=>{
        try {
            console.log("bookmars");
            
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/bookmark`,{withCredentials:true})

            console.log("message",res.data);
            if(res.data.success){
                toast.success(res.data.message)
                
            }
        } catch (error) {
            console.log("error in bookmatks handler", error);
            
        }

    }

    const commentHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });

            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p => p._id === selectedPost._id ? {
                    ...p, comments: updatedCommentData
                } : p)

                dispatch(setPosts(updatedPostData))
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occured while updating the comment status")

        }
    }
    return (
        <div className=' flex  items-center justify-center '>
            <div className=' w-3/4 mx-8 flex- items-center justify-center mt-5 border-b-2'>
                <div className=' flex flex-row justify-between p-4'>
                    <div className='flex items-center justify-center  '>
                        <Avatar h={8} w={8} url={post.author.profilePicture} />
                        <h1 className='p-2'>{post.author.username} 6h</h1>
                    </div>
                    <div className='flex items-center justify-center mr-3 hover:cursor-pointer' onClick={toggleMore}>
                        <PiDotsThreeOutlineFill />
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <img src={post.image} alt="" />
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex'>
                        <button onClick={likeOrDislikeHandler} > <FaRegHeart className=" ml-3 text-2xl mt-2  hover:cursor-pointer cursor-pointer " /></button>

                        <FaRegComment className='ml-3 text-2xl mt-2 hover:text-gray-500 hover:cursor-pointer' onClick={() => {
                            dispatch(setSelectedPost(post))
                            toggleDialog()
                        }} />

                        <PiTelegramLogoThin className='ml-3 text-2xl mt-2 hover:text-gray-500 hover:cursor-pointer ' />

                    </div>
                    <div onClick={bookMarkhandler} className='ml-3 text-2xl mt-2 hover:text-gray-500 hover:cursor-pointer'>
                        <FaRegBookmark />
                    </div>


                </div>
                <h1 className=' text-sm px-2 pt-4 font-bold hover:underline hover:cursor-pointer'>{postLikeCount} likes</h1>
                <div className='flex items-center justify-start'>
                    <h1 className=' font-bold m-2'>{post.author.username} </h1>
                    <p className='text-sm leading-none'>{post.caption}</p>
                </div>
                <div>
                    <button onClick={() => {
                     dispatch(setSelectedPost(post));
                    toggleDialog();
                }}  className='mx-2 w-full hover:underline hover:cursor-pointer'>View all {post?.comments?.length } comments</button>
                </div>
                <div className='flex justify-between items-center'>
                    <input onChange={chageEventHandler} value={text} type="text" placeholder='add a comment...' className=' text-sm w-full  m-3 outline-none' />
                    {text && <span onClick={commentHandler} className='text-blue-500 hover:cursor-pointer'>Post</span>}
                </div>
                {isCommentBox && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>

                        <div className='bg-white h-[90%] w-[70%] rounded flex flex-row'>
                            <div className=' h-full w-[50%]'>
                                <img src={selectedPost?.image} alt="" className='h-full object-contain ' />
                            </div>
                            <div className=' flex-grow relative'>
                                <div className='w-full flex justify-between items-center border-b-2 pb-3'>
                                    <div className='flex justify-center items-center p-4 gap-2 '>
                                        <Avatar h={8} w={8}  src={selectedPost?.comments?.author?.profilePicture}/>
                                        <h1>{selectedPost?.author?.username}</h1>
                                        <p className='text-blue-500 text-sm px-2 hover:cursor-pointer hover:text-blue-800'>follow</p>
                                    </div>

                                    <div className='pr-4 text-xl'>
                                        <button onClick={toggleMore}><BsThreeDots /></button>
                                    </div>

                                </div>
                                <div className='overflow-y-scroll h-[60%]  gap-2 flex flex-col '>
                                    
                                    {selectedPost?.comments.map((comment)=><Comments key={comment._id} comment={comment}/>)}

                                </div>
                                <div className='border-t-2 absolute w-full bottom-0 bg-slate-50'>
                                    <div className='flex  justify-between items-center p-2'>
                                        <div className='flex'>
                                            <FaRegHeart onClick={likeOrDislikeHandler} className='ml-3 text-2xl mt-2 bg-red-500 hover:text-gray-500 hover:cursor-pointer text-gray-500 r' />

                                            <FaRegComment className='ml-3 text-2xl mt-2 hover:text-gray-500 hover:cursor-pointer  hover:cursor-pointd' onClick={toggleDialog} />

                                            <PiTelegramLogoThin className='ml-3 text-2xl  hover:cursor-pointd hover:text-gray-500 hover:cursor-pointer mt-2 text-black' />

                                        </div>
                                        <div onClick={bookMarkhandler} className='mr-3 text-2xl mt-2  hover:cursor-pointd hover:text-gray-500 hover:cursor-pointer'>
                                            <FaRegBookmark />
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full p-2 ml-1'>
                                        <h1 className='text-sm font-semibod hover:text-gray-500 hover:cursor-pointer'>{post.likes.length} likes </h1>
                                        <p className='text-gray-600 text-xs'>
                                            1day ago
                                        </p>
                                    </div>
                                    <div className='flex justify-between items-center gap-1'>
                                        <input onChange={chageEventHandler} value={text} type="text" placeholder='Add a comments... ' className='p-4  text-baseline outline-none w-full border-t-2' />
                                        {text && <span onClick={commentHandler} className='text-blue-500 hover:cursor-pointer'>Post</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={toggleDialog} className='mt-2 text-blue-500'>Close</button>

                    </div>
                )}
                {isMoreMenuOpen && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                        <div className="bg-slate-50  w-96 opacity-100 transparent-none rounded-2xl">
                            <div className='flex flex-col'>

                                {user.username === post.author.username ?
                                    <div className=''>
                                        <button onClick={deletePostHandler} className='p-3 w-full text-sm border-b-2   text-red-600 font-bold'>Delete</button>
                                        <button className='p-3 w-full text-sm border-b-2  '>Edit</button>
                                        <button className='p-3 w-full text-sm border-b-2   '>Hide Like count to other</button>
                                        <button className='p-3 w-full text-sm border-b-2  '>Turn Off commenting</button>
                                    </div> :
                                    <div>
                                        <button className='p-3 w-full text-sm border-b-2  text-red-600 font-bold'>Report</button>
                                        <button className='p-3 w-full text-sm border-b-2 text-red-600 font-bold '>Unfollow</button>
                                    </div>}
                                <button className='p-3 w-full text-sm border-b-2 '>Add to favorites</button>
                                <button className='p-3 w-full text-sm border-b-2 '>Go to post</button>
                                <button className='p-3 w-full text-sm border-b-2 '>Share to..</button>
                                <button className='p-3 w-full text-sm border-b-2 '>Copy link</button>
                                <button className='p-3 w-full text-sm border-b-2 '>Embed</button>
                                <button className='p-3 w-full border-b-2 text-sm '>About this account</button>
                                <button onClick={toggleMore} className='p-3 w-full text-sm  '>Cancel</button>
                            </div>
                        </div>
                        <div>
                            <button onClick={toggleMore} className=' mt-2 text-blue-600 '>close </button>
                        </div>

                    </div>
                )}
            </div>


        </div>
    )
}
