import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '..'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm ({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || '',
        slug: post?.$id || '',
        content: post?.content || '',
        status: post?.status || 'active'
      }
    })
  // Add this at the top of the PostForm component to inspect the value of `post`.

  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)


  const submit = async data => {
    if (post && post.$id) {
      // Make sure post.$id exists before using it
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null

      if (file) {
        appwriteService.deleteFile(post.featuredImage)
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0])

      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback(value => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')

    return ''
  }, [])

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className='flex flex-wrap p-4 bg-white shadow-lg rounded-lg'
    >
      <div className='w-full lg:w-2/3 px-2 mb-4'>
        <Input
          label='Title :'
          placeholder='Enter the title'
          className='mb-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500'
          {...register('title', { required: true })}
        />
        <Input
          label='Slug :'
          placeholder='Generated slug'
          className='mb-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500'
          {...register('slug', { required: true })}
          onInput={e => {
            setValue('slug', slugTransform(e.currentTarget.value), {
              shouldValidate: true
            })
          }}
        />
        <RTE
          label='Content :'
          name='content'
          control={control}
          defaultValue={getValues('content')}
          className='mb-4 border border-gray-300 rounded-lg'
        />
      </div>
      <div className='w-full lg:w-1/3 px-2'>
        <Input
          label='Featured Image :'
          type='file'
          className='mb-4 p-2 border border-gray-300 rounded-lg shadow-sm'
          accept='image/png, image/jpg, image/jpeg, image/gif'
          {...register('image', { required: !post })}
        />
        {post && (
          <div className='w-full mb-4'>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className='w-full h-auto rounded-lg shadow-lg'
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label='Status'
          className='mb-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500'
          {...register('status', { required: true })}
        />
        <Button
          type='submit'
          bgColor={post ? 'bg-green-500' : 'bg-blue-500'}
          className='w-full py-2 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200'
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
