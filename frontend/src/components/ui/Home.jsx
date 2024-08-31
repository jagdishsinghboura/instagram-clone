import React from 'react'
import Feed from './Feed'
import Story from './Story'
import RightSidebar from './RightSidebar'
import useGetAllPost from '../../hooks/useGetAllPost';

export default function Home() {
  useGetAllPost();
  
 
  
  
  return (
    <div className='flex '>
      <div className='flex flex-col w-[65%] '> 
        <div className='  border-l-2 m-2 -mb-2'>
          <Story />
        </div>
        <div className='flex w-full border-l-1'>
          <Feed />
        </div>
      </div>
      <div className='  flex-grow '>
        <RightSidebar />
      </div>
    </div>

  )
}
