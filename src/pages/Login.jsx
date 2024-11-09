import React from 'react'
import { Login as LoginComponent } from '../components' // Renamed to LoginComponent for consistency

function Login () {
  return (
    <div className='py-8'>
      <LoginComponent /> {/* Using the correct component name */}
    </div>
  )
}

export default Login
