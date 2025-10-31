import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Explore() {
    const { posts } = useSelector(state => state.post);


    return (
        <div className='min-h-screen   grid grid-cols-4  m-2 p-2 '>


            {posts.map((post) => (

                <Link  to={`/explore/${post._id}`} className='h-44 w-full border-2'>
                    <img src={post.image} className=' object-contain' />
                </Link>

            ))
            }
        </div>
    )
}
