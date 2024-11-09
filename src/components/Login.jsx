import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const login = async data => {
    setError('')
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
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
                validate: {
                  matchPattern: value =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Please enter a valid email address'
                }
              })}
            />
            <Input
              label='Password: '
              type='password'
              placeholder='Enter your password'
              {...register('password', {
                required: 'Password is required'
              })}
            />
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
