import React from 'react'
import Avatar from '../Avatar'

export default function Story() {
    return (
        <div className='flex'>

            <div className='flex flex-col    w-24'>
                <div className='flex justify-center items-center '>
                    <img src="https://images.unsplash.com/photo-1723844944367-9332e405fd6c?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className={`object-cover rounded-full h-16 w-16`} />
                </div>
                <h1 className='text-xs ml-3 truncate'>jagdish singh bourasdffsdfsfdsfsdfndslkjfndlkf</h1>
            </div>
            <div className='flex flex-col w-24'>
                <div className='flex justify-center items-center'>
                    <img src="https://images.unsplash.com/photo-1723527254394-333bda1ccdc2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className={`object-cover rounded-full h-16 w-16`} />
                </div>
                <h1 className='text-xs ml-3'>jagdish singh</h1>
            </div>

        </div>
    )
}
