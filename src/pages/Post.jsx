import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector(state => state.auth.userData)

  // Check if the current user is the author of the post
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then(post => {
        if (post) setPost(post)
        else navigate('/')
      })
    } else navigate('/')
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then(status => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  return post ? (
    <div className="py-4 md:py-8 lg:py-12">
      <Container>
        <div className="w-full flex flex-col items-center mb-4 relative border rounded-xl p-2 md:p-4 lg:p-6">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl h-48 sm:h-64 md:h-80 object-cover mb-4"
          />

          {isAuthor && (
            <div className="flex gap-4 mt-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg hover:rounded-full text-white hover:bg-green-700 transition-all duration-300 ease-in-out"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg hover:rounded-full text-white hover:bg-red-700 transition-all duration-300 ease-in-out"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center md:text-left">
            {post.title}
          </h1>
        </div>
        <div className="browser-css text-sm md:text-base lg:text-lg leading-relaxed md:leading-loose">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null
}
