import React from 'react'

function Logo ({ width = '100px' }) {
  return (
    <div className='w-16'>
      <img
        src='https://images.pexels.com/photos/29323552/pexels-photo-29323552.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt='Logo'
        style={{ width }}
      />
    </div>
  )
}

export default Logo
