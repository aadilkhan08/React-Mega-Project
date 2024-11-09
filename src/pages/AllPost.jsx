import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts () {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Fetch posts when the component is mounted
    const fetchPosts = async () => {
      try {
        const postsData = await appwriteService.getPosts([])
        if (postsData) {
          setPosts(postsData.documents)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.$id} className='w-full flex justify-center'>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <h1 className='font-bold text-2xl text-center w-full'>
              No posts available
            </h1>
          )}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
