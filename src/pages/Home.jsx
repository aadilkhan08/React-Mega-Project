import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function Home () {
  const [posts, setPosts] = useState([]) // For holding the posts.
  const [loading, setLoading] = useState(true) // To track the loading state.
  const [error, setError] = useState(null) // To track any errors.

  useEffect(() => {
    appwriteService
      .getPosts()
      .then(posts => {
        if (posts) {
          setPosts(posts.documents)
        } else {
          setError('No posts available.') // If there are no posts, set an error.
        }
      })
      .catch(error => {
        setError(error.message) // Handle API errors.
      })
      .finally(() => {
        setLoading(false) // Set loading to false once the API call is completed.
      })
  }, [])

  if (loading) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='p-2 flex justify-center items-center'>
            <div className='w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'></div>
            <h2 className='ml-4'>Loading posts...</h2>{' '}
            {/* Show a loading message */}
          </div>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='p-2'>
            <h2 className='text-red-600'>{error} Login to see posts.</h2>{' '}
            {/* Show the error message */}
          </div>
        </Container>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='p-2'>
            <h1 className='text-2xl font-bold hover:text-gray-500'>
              No posts available
            </h1>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {posts.map(post => (
            <div key={post.$id} className='w-full'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
