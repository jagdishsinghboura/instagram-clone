import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './LeftSidebar'
import Home from './Home'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

function MainLayout() {
  return (
    <div className='flex flex-row '>
      <div className='w-[20%] h-screen     pr-20 '>
        <LeftSidebar />
      </div>
      <div className='w-full h-screen'>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default MainLayout
