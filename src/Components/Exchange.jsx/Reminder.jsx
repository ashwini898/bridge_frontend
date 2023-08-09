import React from 'react'
import {FcIdea} from "react-icons/fc"
export default function Reminder() {
  return (
    <div className='m-3 rounded-md bg-[#F2EDFF] px-5 py-2 border border-indigo-600 '>
        <div className='flex mb-2'><FcIdea size={20}/> <span className='ml-2 text-indigo-600 '>Note :</span></div>
        <ul className='px-10'>
            <li className='text-indigo-600 font-extrathin'>Crosschain Fee is 1 %, Gas fee 0.00 ETH</li>
            <li className='text-indigo-600 font-extrathin'>Estimated Time of Crosschain Arrival is 10-30 min</li>
        </ul>
    </div>
  )
}
