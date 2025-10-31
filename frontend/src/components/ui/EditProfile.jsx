import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import { setAuthUser } from '../../redux/authSlice';
import { MdPerson } from 'react-icons/md';
export default function EditProfile() {
  const { user } = useSelector(store => store.auth)
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username:user?.username,
    profilePhoto: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender
  })


  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({ ...input, profilePhoto: file });
    }
  };


  const selectChangeHandler = (e) => {

    setInput({ ...input, gender: e.target.value })
  }
  const EditProfileHandler = async () => {

    const formData = new FormData();

    formData.append("bio", input.bio);
    formData.append("gender", input?.gender || "male");
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto)
    }


    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/v1/user/profile/edit", formData,{
        headers:{
          'Content-type':"multipart/form-data"
        },
        withCredentials:true,
      });


      if(res.data.success){
        const updatedUserData ={
          ...user,
          bio:res.data?.user?.bio,
          profilePicture:res.data?.user?.profilePicture,
          gender:res.data?.user?.gender,
          username:res.data?.user?.username,
        }

        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=' h-12 w-full max-w-2xl mx-auto '>
      <section className='flex flex-col gap-6  w-full my-8'>
        <h1 className='font-bold  text-xl p-2'> Edit Profile</h1>
        <div className='flex  justify-center items-center w-full bg-gray-100 rounded-2xl'>
          <div className='w-[90%] flex justify-between items-center '>
            <div className='flex gap-8 p-1  '>
              <div className='flex justify-center items-center'>
              {user?.profilePicture
              ?<img src={user?.profilePicture} alt="" className='w-20 h-20 p-2 rounded-full object-cover' /> 
              : <MdPerson className=' text-white bg-gray-400  rounded-full -p-1'  size={40}/>}  
              
              </div>
              <div className='flex flex-col items-center justify-center'>
                <input type="text" value={input?.username} onChange={(e) => setInput({ ...input, username: e.target.value })} className='p-1 border-gray-400 outline-slate-400' />
              </div>
            </div>
            <div className=''>
              <input ref={imageRef} type="file" className="hidden" onChange={fileChangeHandler} />
              <button onClick={() => imageRef?.current?.click()} className="bg-blue-400 p-1 px-4 rounded-lg">
                Change photo
              </button>
            </div>
          </div>
        </div>
        <div className='w-full '>
          <h1 className='font-bold text-base mb-2'>Bio</h1>
          <div className='border-2 rounded-lg border-slate-200'>
            <textarea value={input?.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} className=' p-2 focus-visible:ring-transparent h-12 rounded-lg  border-slate-400 outline-none border-1' name='bio' rows={2} cols={90}></textarea>
          </div>
          <div className='w-full my-6'>
            <h1 className='font-bold text-base mb-2'>Gender</h1>
            <select defaultValue={input?.gender} onChange={selectChangeHandler} className='w-full p-4  outline-none border-2 border-slate-200 rounded-lg'>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="custom">Custom</option>
            </select>
            <p className='p-2 text-xs text-slate-400'>This is not part of your public profile</p>

          </div>
        </div>

        <div className='w-full flex items-center justify-end'>
          <button onClick={EditProfileHandler} className='text-xl p-2 bg-blue-500 rounded-lg w-52 flex justify-center'>
            {
              (loading ? <FaSpinner className='animate-spin mr-2' /> : "submit")
            }

          </button>

        </div>
      </section>
      <ToastContainer />
    </div>

  )
}
