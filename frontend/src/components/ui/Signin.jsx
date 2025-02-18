import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";

export default function Signin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    let handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8000/api/v1/user/login", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            if (response.data.success) {
                dispatch(setAuthUser(response.data.user));
                
                toast.success(" login success successfully")
                setFormData({
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    
                }, 2000);
                navigate("/")
                
            }
        } catch (error) {
            console.log("error in signup ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <form className='shadow-lg flex flex-col gap-5 p-8' onSubmit={handleSignup}>
                <div className='my-4'>
                <i data-visualcompletion="css-img" aria-label="Instagram"  role="img" className="background-image:  background-position: 0px -52px background-size:auto; width:175px; height: 51px; background-repeat: no-repeat; display: inline-block;" >sdfsaf</i>
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-center text-sm '>Sign in to see photos and videos from your friends</p>
                </div>

                <div>
                    <span className='py-2 m-4 font-medium '> email</span>
                    <input
                        type='text'
                        name='email'
                        value={formData.email}
                        onChange={handleFormData}
                        placeholder='Enter your Email'
                        id='email'
                        className='focus-visible:ring-transparent my-4'
                    />
                </div>
                <div>
                    <span className='py-2 m-4 font-medium '> password</span>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleFormData}
                        placeholder='Enter your Password'
                        id='password'
                        className='focus-visible:ring-transparent my-4'
                    />
                </div>
                {
                    !loading?(
                        <button className='w-full h-12 bg-slate-950 rounded-lg text-white'>Signin</button>)
                    :(<button disabled  className='w-full h-12 bg-slate-950 rounded-lg text-white text-center'>
                    <div className="flex flex-row justify-center itesms-center hover:cursor-wait"> <span className="p-2"><AiOutlineLoading3Quarters className="  animate-spin" /></span> <p> Signin</p></div>
                </button>)
                }

              
                
                <span className='text-center  w-full   hover:cursor-pointer hover:text-slate-700 hover:underline '>
                    <Link to={"/signup"}>Don't  have an accoount ?   </Link></span>
            </form>
        </div>
    );
}
