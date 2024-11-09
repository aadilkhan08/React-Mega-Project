import React from 'react'

function Container ({ children }) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-6 bg-white shadow-lg rounded-lg'>
      {children}
    </div>
  )
}

export default Container
