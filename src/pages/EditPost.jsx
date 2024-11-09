import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost () {
  const [post, setPost] = useState(null) // Post is initialized with null.
  const [loading, setLoading] = useState(true) // Loader state to manage loading.
  const [error, setError] = useState(null) // Error state to manage errors.
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then(post => {
          if (post) {
            setPost(post)
          } else {
            setError('Post not found') // Error handling when post is not found.
            navigate('/404') // Redirect to a "not found" page (or anywhere you want).
          }
        })
        .catch(error => {
          setError(error.message) // Error handling for API call.
        })
        .finally(() => {
          setLoading(false) // Finish loading state after API call.
        })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  if (loading) {
    return (
      <div className='p-2 flex justify-center items-center'>
        <div className='w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'></div>
        <h2 className='ml-4'>Loading posts...</h2>{' '}
        {/* Show a loading message */}
      </div>
    ) // Show loader while fetching data.
  }

  return error ? (
    <div className='text-center text-red-600 py-8'>{error}</div> // Show error message if any error occurs.
  ) : post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost
