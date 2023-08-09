import React from 'react'
import loading from "../assert/loading.gif"
export default function SwitchModel({show,value}) {
    return show ? (
        <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 flex-col  bottom-0 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full h-full bg-[#0000004C]">
            <img src={loading}/>
            <br/>
            <h1 className='text-[#f2eaf8] font-bold text-xl '>{value}</h1>
        </div>
      ) : null;
}
