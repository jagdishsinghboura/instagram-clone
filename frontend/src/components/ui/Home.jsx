import React from 'react'
import Feed from './Feed'
import Story from './Story'
import RightSidebar from './RightSidebar'
import useGetAllPost from '../../hooks/useGetAllPost';
import { useSelector } from 'react-redux';

export default function Home() {
  useGetAllPost();
  const { user } = useSelector(store => store.auth)
  
  return (
    <div className='flex '>
      <div className='flex flex-col  min-w-[72%] '> 
        <div className='  border-b-1 shadow-sm  p-4 truncate'>
          <Story />
        </div>
        <div className='flex  '>
        {user?<Feed /> :<div className='flex justify-center items-center h-[84vh] w-full'>
            <h1 className='text-5xl font-sans'>
               please login...
            </h1>
          </div>}
        </div>
      </div>
      <div className='   hidden md:block border-l-2 shadow-xl '>
        <RightSidebar />
      </div>
    </div>

  )
}
