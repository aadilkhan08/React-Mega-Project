import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer () {
  return (
    <section className='relative overflow-hidden py-12 bg-gray-800 text-gray-300 border-t border-gray-700'>
      <div className='relative z-10 mx-auto max-w-7xl px-6'>
        <div className='flex flex-wrap -m-6'>
          <div className='w-full p-6 md:w-1/2 lg:w-5/12'>
            <div className='flex flex-col h-full justify-between'>
              <div className='mb-6 flex items-center'>
                <Logo />
              </div>
              <p className='text-sm text-gray-400'>
                &copy; 2023 DevUI. All rights reserved.
              </p>
            </div>
          </div>
          <div className='w-full p-6 md:w-1/2 lg:w-2/12'>
            <div className='h-full'>
              <h3 className='mb-4 text-sm font-semibold uppercase text-gray-400 tracking-wide'>
                Company
              </h3>
              <ul>
                <li className='mb-3'>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Features
                  </Link>
                </li>
                <li className='mb-3'>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Pricing
                  </Link>
                </li>
                <li className='mb-3'>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full p-6 md:w-1/2 lg:w-2/12'>
            <div className='h-full'>
              <h3 className='mb-4 text-sm font-semibold uppercase text-gray-400 tracking-wide'>
                Support
              </h3>
              <ul>
                <li className='mb-3'>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Account
                  </Link>
                </li>
                <li className='mb-3'>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Help
                  </Link>
                </li>
                <li className='mb-3'>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full p-6 md:w-1/2 lg:w-3/12'>
            <div className='h-full'>
              <h3 className='mb-4 text-sm font-semibold uppercase text-gray-400 tracking-wide'>
                Legals
              </h3>
              <ul>
                <li className='mb-3'>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className='mb-3'>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className='text-gray-300 hover:text-white' to='/'>
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
