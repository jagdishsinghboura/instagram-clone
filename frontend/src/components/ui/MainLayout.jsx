import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import { useSelector } from 'react-redux'

function MainLayout() {

  const { user } = useSelector(store => store.auth)

  return (
    <div className="flex flex-row h-screen">
      <div className="   p-2  rounded-sm border-r-2 shadow-dxl">
        <LeftSidebar />
      </div>

      <div className="flex-1 overflow-auto">
        <Outlet />
        
      </div>
    </div>

  )
}

export default MainLayout
