import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice' // Redux login action
import { Button, Input, Logo } from './index' // Importing UI components
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth' // Appwrite AuthService
import { useForm } from 'react-hook-form'

function Login () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [error, setError] = useState('')

  // Function to handle form submission
  const login = async data => {
    setError('') // Clear previous errors
    try {
      const session = await authService.login(data) // Attempt to log in
      if (session) {
        const userData = await authService.getCurrentUser() // Fetch user data
        if (userData) {
          dispatch(authLogin(userData)) // Dispatch user data to Redux
          navigate('/') // Redirect to home
        }
      }
    } catch (error) {
      setError(error.message) // Show error message if login fails
    }
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-gray-50'>
      <div className='mx-auto w-full max-w-lg bg-white rounded-xl p-8 shadow-md border border-gray-200'>
        <div className='mb-4 flex justify-center'>
          <Logo width='100%' />
        </div>
        <h2 className='text-center text-2xl font-semibold text-gray-700'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-500'>
          Don&apos;t have an account?&nbsp;
          <Link
            to='/signup'
            className='font-medium text-blue-600 hover:underline'
          >
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-4 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label='Email: '
              placeholder='Enter your email'
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && (
              <p className='text-red-600'>{errors.email.message}</p>
            )}

            <Input
              label='Password: '
              type='password'
              placeholder='Enter your password'
              {...register('password', {
                required: 'Password is required'
              })}
            />
            {errors.password && (
              <p className='text-red-600'>{errors.password.message}</p>
            )}

            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
