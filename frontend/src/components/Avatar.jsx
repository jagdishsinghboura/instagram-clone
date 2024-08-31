import React from 'react'

export default function Avatar({ h, w, url }) {
  return (
    <div className='flex'>
      <div className={`flex items-center justify-center`}>
        <img
          src={url ?
            url : "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt=""
          className={`h-${h} w-${w} object-cover rounded-full`}
        />
      </div>
    </div>
  )
}
