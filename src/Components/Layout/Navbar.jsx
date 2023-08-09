import React from 'react'
import {BiSolidUserCircle} from "react-icons/bi"
import {PiBridgeBold} from "react-icons/pi"
import { ConnectButton } from '@rainbow-me/rainbowkit'
export default function Navbar() {
  return (
      <div className='w-full flex justify-between py-4 px-48 shadow bg-[#FFFFFF]' >
         <div className='flex space-x-2'>
          <PiBridgeBold  size={45}/>
           <h3 className='py-3'>Bridge</h3>
         </div>
         <div className='flex space-x-4'>
          <div className='flex space-x-2 '>
           <BiSolidUserCircle  size={45}/>
           <span className=' py-3'>Saurav singh</span>
          </div>
           <ConnectButton/>
         </div>
      </div>
  )
}
