import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);



    let handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8000/api/v1/user/register", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            if (response.data.success) {
                toast.success(" Account created successfully")
                setFormData({
                    username: "",
                    email: "",
                    password: ""
                })
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
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-center text-sm '>Sign up to see photos and videos from your friends</p>
                </div>
                <div>
                    <span className='py-2 m-4 font-medium '> username</span>
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleFormData}
                        placeholder='Enter your Username'
                        id='username'
                        className='focus-visible:ring-transparent my-4'
                    />
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
                <button className='w-full h-12 bg-slate-950 rounded-lg text-white'>Signup</button>
                
                    <span className='text-center  w-full   hover:cursor-pointer hover:text-slate-700 hover:underline '> 
                    <Link to={"/login"}>Already have an accoount ?   </Link></span>
              
            </form>
        </div>
    );
}
