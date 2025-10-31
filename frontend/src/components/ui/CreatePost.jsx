import React, { useRef, useState } from 'react'
import { readFileAsDataURL } from '../../lib/utils';
import { FaArrowLeft } from "react-icons/fa6";
import Avatar from '../Avatar';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setPosts } from '../../redux/postSlice';

export default function CreatePost({ open, setOpen }) {

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [imagePreview, setImagePreview] = useState("");
    const [location, setLocation] = useState("");
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState("");
    const { user } = useSelector(store => store.auth)
    const [loading , setLoading] =useState(false)
    const dispatch =useDispatch();
    const {posts} =useSelector(state=>state.post)
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setFileName(file.name);
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl)
        }
    };

    const createPostHandler =async (e)=>{
        setLoading(true);
       
        const formData = new FormData();
        formData.append("caption",caption);
        if(imagePreview)formData.append("image", file);
        try {
            const res = await axios.post("http://localhost:8000/api/v1/post/addpost",
                formData,
                {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    },
                    withCredentials:true
                }
             )
             if(res?.data?.success){
                dispatch(setPosts([ res?.data?.post,...posts]))
                toast.success(res.data.message)
                setOpen(false)
             }
           
            
        } catch (error) {
            console.log("error");
            toast.error(error.response.data.message)
            
        }
    }
    return (

        <div>
            {open && (
                imagePreview ?
                    <div className='fixed inset-0 flex  justify-center items-center bg-black bg-opacity-70'>
                        <div className='bg-white w-[60%] rounded-xl h-3/4 '>
                            <div className='flex p-2 border-b-2'>
                                <div className='flex justify-between items-center w-full px-6'>
                                    <FaArrowLeft className='text-xl' />
                                    <h2 className='font-medium'>Create new post</h2>
                                    <button className='text-blue-500' onClick={createPostHandler}>share</button>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className=' w-[55%] border-r-2'>
                                    <img src={imagePreview} alt="Img" className='object-cotain' />
                                </div>
                                <div className=''>
                                    <div className='flex gap-4 p-4'>
                                        
                                        <Avatar h={8} w={8} src={user.profilePicture}  />
                                        <h1>{user.username}</h1>
                                    </div>
                                    <div className=' '>
                                        <textarea  value={caption} onChange={(e)=>setCaption(e.target.value)} name="" id="" rows={10} cols={40} className='w-full outline-none p-2' placeholder='caption for you pic' > add</textarea>
                                    </div>
                                    <div className='w-full '>
                                        <input type="text" value={location} placeholder='Add Location ' className='p-3' onChange={(e) => setLocation(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='absolute   top-2 right-3 text-center  m-4 text-2xl text-white '>
                            <button onClick={()=>setOpen(!open)}><RxCross1/></button>
                        </div>
                    </div> :
                    <div className='w-screen '>
                        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-60'>
                            <div className='bg-white w-[27%] rounded-xl h-3/5'>
                                <h1 className='w-full text-center p-4 border-b-2 font-semibold'>Create new post</h1>
                                <div className='  flex flex-col items-center justify-center   h-[85%] rounded-2xl'>
                                    <div className='w-full flex-col justify-center items-center'>
                                        <div className='flex justify-center items-center'>
                                            <svg aria-label="Icon to represent media such as images or videos" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                        </div>
                                    </div>
                                    <h3 className='text-xl p-3'> Drag photos and videos here</h3>
                                    <div>
                                        <button onClick={handleButtonClick} className='bg-[#0095F6] p-1 rounded-xl px-3 text-white mx-auto'>Select from computer</button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                        {/* {fileName && <p>Selected file: {fileName}</p>} */}
                                    </div>


                                </div>
                            </div>
                            <button className='text-xl' onClick={() => setOpen(!open)}>close</button>

                        </div>
                        <div className='absolute   top-2 right-3 text-center  m-4 text-2xl text-white '>
                            <button onClick={()=>setOpen(!open)}><RxCross1/></button>
                        </div>
                    </div>
            )}

    <ToastContainer 
     position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
    />

        </div>


    )
}
