import React, { useContext, useEffect, useState } from 'react'
import { use } from 'react';
import { MdPerson } from 'react-icons/md'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar';

export default function Search() {

  const { user, suggestedUsers } = useSelector((state) => state.auth);
  const [users, setUsers] = useState(suggestedUsers || []);
  const [input, setInput] = useState("");


  useEffect(() => {
    if(input.length>0){
    const filteredUsers = [...suggestedUsers].filter((u)=>u.username.trim().toLowerCase().includes(input.trim().toLowerCase()))
    setUsers(filteredUsers);
    }else{
      setUsers(suggestedUsers)
    }
  }, [input, suggestedUsers])







  return (
    <div className='  min-h-screen '>

      <div className='w-full mt-20'>
        <h1 className='w-full flex justify-center items-center '>
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text " placeholder='search user here...' className='p-4 rounded-md outline-none  placeholder:text-slate-500 text-xl placeholder:text-sans  bg-slate-300   text-slate-700  text-serif m-2 w-[80%]   ' />
        </h1>
        <div className='min-h-screen   flex items-center p-2 m-6 flex-col'>
          {users.length>0 ?users.map((user) => (
            <div className='flex flex-row w-[80%]  gap-4 font-sans m-2'>
              {user.profilePicture
                ? <Avatar w={10} h={10} url={user.profilePicture} />
                : <MdPerson className='w-10 h-10 rounded-full p-1  text-white bg-gray-400' />
              }
              <div>
                <h1 className='text-xl font-sans '>{user.username}</h1>
                <p className='text-sm font-sans'>{user.bio}</p>
              </div>
            </div>
          )):<div>
              <p className='text-md font-sans text-slate-400'>user not found</p>
          </div>
          }

        </div>
      </div>

    </div>
  )
}
