import React, { useEffect, useState } from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'

export default function Feed() {

  const {posts} = useSelector(state=>state.post)
  const[shufflePosts , setShufflePosts] = useState([]);

  useEffect(()=>{
    const shuffleP = [...posts].sort(()=>Math.random() -.5);
    setShufflePosts(shuffleP)
  },[posts])
  

  return (
    <div className='flex mx-2 flex-col   m-2  '>

      {
        shufflePosts.map((post)=>(
          <Post key={post._id} post={post}/>
        ))
      }

    </div>
  )
}
