import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegCompass } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { GiCircleClaws } from "react-icons/gi";
import { IoReorderThreeOutline } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';
import { setAuthUser } from '../../redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '../../redux/postSlice';
import { RxAvatar } from 'react-icons/rx';
import { IoLogoInstagram } from "react-icons/io5";
import { MdLogout } from 'react-icons/md';

export default function LeftSidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)
    const [open, setOpen] = useState(false);
    const { likeNotification } = useSelector(store => store.realTimeNotification)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const location = useLocation()




    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
                withCredentials: true,
            })
            if (res?.data?.success) {
                dispatch(setAuthUser(null))
                dispatch(setSelectedPost(null))
                dispatch(setPosts([]))
                navigate("/login")
                toast.success(res.data.message);

            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in logout ", error)
        }

    }


    const sidebarHandler = async (textType) => {
        if (textType === "Logout") {
            logoutHandler();
        }
        if (textType === "Login") {
            navigate("/login")
        }

        if (textType === "Create") {
            hadlerCreate();
        }
        if (textType === "Profile") {
            navigate(`profile/${user?._id}`);
        }
        if (textType === "Home") {
            navigate("/")
        }
        if (textType === "Messages") {
            navigate("/chat")
        }
        if (textType === "Notifications") {
            setIsNotificationOpen(!isNotificationOpen);
        }

        if(textType=="Search"){
            navigate("/search")
        }
        if(textType=="Explore"){
            navigate("/explore")
        }

    }
    const hadlerCreate = () => {
        setOpen(!open)
    }
    const sidebarItems = [
        { icons: <FaHome />, text: "Home"  ,path:"/" },
        { icons: <CiSearch />, text: "Search"  ,path:"/search"},
        { icons: <FaRegCompass />, text: "Explore"  ,path:"/explore"},
        // {
        //     icons: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className='w-8  h-8'>
        //         <path d="M 15 4 C 8.9365932 4 4 8.9365932 4 15 L 4 35 C 4 41.063407 8.9365932 46 15 46 L 35 46 C 41.063407 46 46 41.063407 46 35 L 46 15 C 46 8.9365932 41.063407 4 35 4 L 15 4 z M 16.740234 6 L 27.425781 6 L 33.259766 16 L 22.574219 16 L 16.740234 6 z M 29.740234 6 L 35 6 C 39.982593 6 44 10.017407 44 15 L 44 16 L 35.574219 16 L 29.740234 6 z M 14.486328 6.1035156 L 20.259766 16 L 6 16 L 6 15 C 6 10.199833 9.7581921 6.3829803 14.486328 6.1035156 z M 6 18 L 44 18 L 44 35 C 44 39.982593 39.982593 44 35 44 L 15 44 C 10.017407 44 6 39.982593 6 35 L 6 18 z M 21.978516 23.013672 C 20.435152 23.049868 19 24.269284 19 25.957031 L 19 35.041016 C 19 37.291345 21.552344 38.713255 23.509766 37.597656 L 31.498047 33.056641 C 33.442844 31.951609 33.442844 29.044485 31.498047 27.939453 L 23.509766 23.398438 L 23.507812 23.398438 C 23.018445 23.120603 22.49297 23.001607 21.978516 23.013672 z M 21.982422 24.986328 C 22.158626 24.988232 22.342399 25.035052 22.521484 25.136719 L 30.511719 29.677734 C 31.220922 30.080703 31.220922 30.915391 30.511719 31.318359 L 22.519531 35.859375 C 21.802953 36.267773 21 35.808686 21 35.041016 L 21 25.957031 C 21 25.573196 21.201402 25.267385 21.492188 25.107422 C 21.63758 25.02744 21.806217 24.984424 21.982422 24.986328 z"></path>
        //     </svg>, text: "Reel"
        // },
        { icons: <AiOutlineMessage />, text: "Messages"  ,path:"/chat"},
        { icons: <FaRegHeart />, text: "Notifications" ,path:"/notifications" },
        { icons: <FaRegPlusSquare className='rounded-lg' />, text: "Create" ,path:"/create" },
        { icons: <Avatar h={8} w={8} url={user?.profilePicture} />, text: "Profile"  ,path:`/profile/${user?._id}`},
        { icons: <MdLogout />, text:  user?"Logout":"Login"  ,path:user?"/logout":"/login"},
    ]
    return (

        <div className='flex flex-col  min-h-screen'>
            <h2 className=' flex items-center pl-9 h-16 mb-10 pt-6 '>
                <IoLogoInstagram className='text-4xl font-serif mb-2 mr-1 '/>
                <svg aria-label="Instagram" className=" hidden md:block x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="29" role="img" viewBox="32 4 113 32" width="103"><title>Instagram</title><path clipRule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fillRule="evenodd"></path></svg>
            </h2>
            <div className='flex flex-col justify-evenly  flex-1'>

            {
                sidebarItems.map((items, index) => {
                    
                    const isActive = location.pathname===(items.path)
                    return <button onClick={() => sidebarHandler(items.text)} className={` ${isActive?"bg-blue-500/20":""}    items-center rounded-md flex flex-row   border-none `} key={index}>
                        <div className=' relative flex flex-row    pl-4 p-3   '>
                            <div className=' text-3xl  pr-4'>
                                {items.icons}
                            </div>
                            <h2 className='text-xl hidden md:block'>{items.text}</h2>
                            {
                                (items.text === "Notifications" && (likeNotification.length > 0)) ?
                                    <div className={` absolute   `}>
                                        <button className='rounded-full h-6  w-6 absolute bottom-5 left-5  bg-red-600 '>{Notification.length}</button>
                                        ({likeNotification?.map((notifi) => {
                                            return (isNotificationOpen && <div className=''>
                                                <div className={` absolute flex w-60 h-12 items-center justify-center rounded-md gap-2 top-12 z-50  shadow-2xl  shadow-slate-500  ${Notification.length != 0 ? " bg-white " : "  "}`}>
                                                    <RxAvatar className='text-4xl' />
                                                    <p className=' p-2'><span className='font-bold flex'>{notifi.userDetails?.username}</span> like you posts</p>
                                                </div>
                                            </div>)
                                        })})


                                    </div>

                                    : ""
                            }
                        </div>

                    </button>

})
            }
             </div>
            <CreatePost open={open} setOpen={setOpen} />
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
