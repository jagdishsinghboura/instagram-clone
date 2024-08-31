import React from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'

export default function Feed() {
  const {posts} = useSelector(state=>state.post)
  

  return (
    <div className='flex mx-2 flex-col  w-full  '>

      {
        posts.map((post)=>(
          <Post key={post._id} post={post}/>
        ))
      }

    </div>
  )
}
