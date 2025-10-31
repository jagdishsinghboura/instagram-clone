import React from 'react'
import Avatar from './Avatar'
import { CiHeart } from 'react-icons/ci'

export default function Comments({key, comment}) {
    return (
        <div className='flex flex-row justify-between items-center' key={key}>
            <div className='flex items-center p-2'>
                <Avatar h={8} w={8}  src={comment?.author?.profilePicture}/>
                <h2 className='text-sm font-bold   m-2 mr-2'>{comment?.author?.username}</h2>
                <p>{comment?.text} </p>
            </div>
            <div className='mr-2'>
                <CiHeart />
            </div>
        </div>
    )
}
