import React,{useState,useEffect} from 'react'
import { BsCoin } from "react-icons/bs"
import { MdKeyboardArrowDown } from "react-icons/md"
import {FaNetworkWired} from "react-icons/fa"
import SelectModel from '../../Model/SelectModel'
import SelectNetwork from '../../Model/SelectNetwork'
import { network ,getValue} from '../../assert/network'
import swal from 'sweetalert'
import "./index.css"
export default function From({selectedNetFrom,setselectedTokenFrom,selectedToken,setSelectedToken,selectedNetTo,setTokenAmount,setSwitchModel}) {
    const [tokenModel,setShow]=useState(false)
    const[networkModel,setnetworkModel]=useState(false)

    function hideTokenModel(value,isButton){
        if(isButton){
            setShow(!tokenModel)
            return null;
        }
        console.log(value)
        setSelectedToken(value)
        setShow(!tokenModel)
    }
    function hideNetwokModel(value,isButton){
         if(isButton){
            setnetworkModel(false) 
            return null;
         }
            setselectedTokenFrom(value);
            if(value.chainId==selectedNetTo.chainId){
                setnetworkModel(true);
                swal("Opps!","Source and Destination network same ...",'error')
               
            }else{
                setnetworkModel(false)  
            }
               
    }
 
    return (
        <div className='py-5 h-36 border px-10 bg-white rounded-lg shadow ring-0' >
            <div >
                <p className='font-light text-gray-600'> Enter Token Amount</p>
            </div>
            <div className='flex'>
                <div ><input type='number' placeholder='0.0' className='focus:outline-none appearance-none border-b border-black import placesize: asas'  style={{ width: "460px",height:"70px"}} onChange={(e)=>{setTokenAmount(e.target.value)}} /></div>
                <div className='flex mx-3 bg-[#F2EDFF] px-2 py-2 h-20 w-60 justify-between border border-indigo-200 rounded-md items-center cursor-pointer' onClick={()=>{setShow(!tokenModel)}}>
                    <div className='flex  '> 
                        <div >
                           <img src={selectedToken?.tokeniconurl}/>
                        </div>
                        <div  className='ml-3'>
                            <p className='text-[#032FA1] font-bold '>{selectedToken?.tokenSymbol}</p>
                            <span className='font-extralight text-[#032FA1]'>{selectedToken?.tokenName}</span>
                        </div>
                    </div>
                    <div className=''>
                        <MdKeyboardArrowDown size={35}  className='px-2 py-2 bg-white rounded-full'/>
                    </div>
                </div>
                <div className='flex mx-3 bg-[#F2EDFF] px-2 py-2 h-20 w-60 justify-between border border-indigo-200 rounded-md items-center cursor-pointer' onClick={()=>{setnetworkModel(true)}}>
                    <div className='flex  '> 
                        <div >
                        <img src={selectedNetFrom?.networkiconUrl}/>
                        </div>
                        <div  className='ml-3'>
                            <p className='text-[#032FA1] font-bold '>{selectedNetFrom?.networkName}</p>
                            <span className='font-extralight text-[#032FA1]'>{selectedNetFrom?.networkType}</span>
                        </div>
                    </div>
                    <div className=''>
                        <MdKeyboardArrowDown size={35}  className='px-2 py-2 bg-white rounded-full'/>
                    </div>
                </div>
            </div>
            <SelectModel show={tokenModel} hide={hideTokenModel}/>
            <SelectNetwork show={networkModel} hide={hideNetwokModel} component={"from"}/>
        </div>
    )
}
