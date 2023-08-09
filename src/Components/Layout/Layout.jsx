import React from 'react'
import Navbar from './Navbar'
export default function Layout({children}) {
  return (
    <div  className='bg-[#F7F8FA] h-screen'>
        <Navbar/>
        <div className='px-48'>{children && children}</div>
    </div>
  )
}
