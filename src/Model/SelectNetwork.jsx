import React, { useState } from 'react'
import "./index.css"
import { BsCoin } from "react-icons/bs"
import {network,getValue} from "../assert/network"

export default function SelectNetwork({ show, hide,component }) {
    const [switchModel,setSwitchModel]= useState(false);
    const handleCloseModal = (e) => {
        const value = getValue(e);  
        if(value){
            hide(value)
        }
        
    };
    const handleCloseButton=()=>{
        hide("",true);
      }
  
    return show ? (
      <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0  bottom-0 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full h-full bg-[#0000004C]">
      <div class="relative w-full max-w-md max-h-full">
        
          <div class="relative bg-white rounded-lg shadow ">
              <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="crypto-modal" onClick={handleCloseButton}>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Close modal</span>
              </button>
          
              <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-base font-semibold text-gray-500 lg:text-xl">
                      Select a Network
                  </h3>
              </div>
            
              <div class="p-6">
                  <ul class="my-4 space-y-3 scrollable-container ">
                      {
                        network.map((items,index)=>{
                            return (component=='from'?
                            items.networkName=="RGB"?null:
                            <li key={index} >
                            <button value={items.chainId} href="#" class="flex items-center p-3 text-base font-bold  rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow   dark:text-white w-full" onClick={(e)=>{handleCloseModal(e.target.value)}}>
                                <img src={items.networkiconUrl}/>
                                <span class=" ml-3 whitespace-nowrap text-black">{items.networkName}</span>
                            </button>
                        </li>
                            :<li key={index} >
                            <button value={items.chainId} href="#" class="flex items-center p-3 text-base font-bold  rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow   dark:text-white w-full" onClick={(e)=>{handleCloseModal(e.target.value)}}>
                                <img src={items.networkiconUrl}/>
                                <span class=" ml-3 whitespace-nowrap text-black">{items.networkName}</span>
                            </button>
                        </li>)
                          })
                      }
                  </ul>
                  <div>
                      <a href="https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/" class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                          <svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                          </svg>
                          What is token</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
    ) : null;
  }
  
  





