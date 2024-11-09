import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard ({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='bg-gray-100 w-full rounded-xl overflow-hidden p-4 shadow-md'>
        <div className='w-full justify-center mb-4'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='rounded-xl'
          />
        </div>
        <h2 className='text-xl font-bold truncate'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
