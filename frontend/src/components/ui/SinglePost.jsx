import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Post from './Post';

export default function SinglePost() {

  const { posts } = useSelector(state => state.post);
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const foundPost = posts.find((u) => u._id.toString() === id.trim());
    setPost(foundPost);
    console.log(foundPost);
  }, [id, posts]);

  return (
    <div>
      {post ? <Post post={post}/> : <p>Loading post...</p>}
    </div>
  )
}
