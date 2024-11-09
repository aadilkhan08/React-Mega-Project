import React from 'react'
import { Container, PostForm } from '../components'

function AddPost () {
  return (
    <div className='py-8'>
      <Container>
        <div className='mx-auto w-full max-w-4xl px-4'>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost
