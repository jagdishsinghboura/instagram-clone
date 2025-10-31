import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { MdPerson } from "react-icons/md";

export default function Avatar({ h, w, url }) {
  return (
    <div className='flex'>
      <div className={`flex items-center justify-center`}>
        {url?<img
          src={url}
            alt=""
          className={`h-${h} w-${w} object-cover rounded-full`}
        /> : <MdPerson className=' text-white bg-gray-400 rounded-full -p-1' size={40}/>}
        
      </div>
    </div>
  )
}
