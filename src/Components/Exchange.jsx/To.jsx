import React, { useState, useEffect } from 'react'
import { BsCoin } from "react-icons/bs"
import { MdKeyboardArrowDown } from "react-icons/md"
import { FaNetworkWired } from "react-icons/fa"
import SelectModel from '../../Model/SelectModel'
import swal from 'sweetalert'
import SelectNetwork from '../../Model/SelectNetwork'
import { network ,getValue} from '../../assert/network'
import "./index.css"
import { isNullish } from 'web3-utils'
export default function To({ selectedNetTo, selectedToken, setSelectedToken, selectedNetFrom,tokenAmount,setResvWallat,setBlindUtxo,resvWallat,blindUtxo,setSelectedNetTo,}) {
    const [tokenModel, setShow] = useState(false)
    const [networkModel, setnetworkModel] = useState(false)
    const [isRgbTrue,setRgbTrue]=useState(false)

    
   
    function hideTokenModel(value, isButton) {
        if (isButton) {
            setShow(!tokenModel)
            return
        }
        setSelectedToken(value)
        setShow(!tokenModel)
    }

    function hideNetwokModel(value,isButton){
         if(isButton){
            setnetworkModel(false) 
            return null;
         }
     
         if(value.networkName=="RGB")
         {
           setRgbTrue(true)
           setnetworkModel(false)
           setSelectedNetTo(value)
         }else{
            if(value.chainId==selectedNetFrom.chainId){
                setnetworkModel(true);
                swal("Opps!","Source and Destination network same ...",'error')
               
            }else{
                setSelectedNetTo(value)
                setnetworkModel(false)  
                setRgbTrue(false)
            }
             
         }  
           
    }
    return (
        <div className={`py-5  border px-10 bg-white rounded-lg shadow ring-0 ${isRgbTrue?'h-36':'h-36'} ease-in duration-300`}>

            <div className='flex'>
                <div className='flex-col' >
                    <p className='font-light text-gray-600 '>{isRgbTrue?"Enter Your Wallat Address":"Amount you recieve in wallat "}</p>
                    <input type={isRgbTrue?'text':'number'} disabled={isRgbTrue?false:true} value={isRgbTrue?resvWallat:tokenAmount} className={`focus:outline-none appearance-none border-b border-black import placesize:to cursor-not-allowed ${isRgbTrue?'cursor-text':'cursor-not-allowed'}`} style={{ width: "460px", height: "70px" }} onChange={(e)=>{setResvWallat(e.target.value)}} />
                    {/* {
                        isRgbTrue ?<> <p className='font-light text-gray-600 mt-5 ease-in'> Enter Blind UTXO</p>
                        <input type='text'  value={blindUtxo}  className='focus:outline-none appearance-none border-b ease-in border-black import placesize: to  ' style={{ width: "460px", height: "70px" }} onChange={(e)=>{setBlindUtxo(e.target.value)}} /></>
                        :null
                    } */}
                    
                </div>
                <div className='flex mx-3 bg-[#F2EDFF] px-2 py-2 h-20 w-60 justify-between border border-indigo-200 rounded-md items-center cursor-pointer' onClick={() => { setShow(!tokenModel) }}>
                    <div className='flex  '>
                        <div >
                            <img src={selectedToken?.tokeniconurl} />
                        </div>
                        <div className='ml-3'>
                            <p className='text-[#032FA1] font-bold '>{selectedToken?.tokenSymbol}</p>
                            <span className='font-extralight text-[#032FA1]'>{selectedToken?.tokenName}</span>
                        </div>
                    </div>
                    <div className=''>
                        <MdKeyboardArrowDown size={35} className='px-2 py-2 bg-white rounded-full' />
                    </div>
                </div>
                <div className='flex mx-3 bg-[#F2EDFF] px-2 py-2 h-20 w-60 justify-between border border-indigo-200 rounded-md items-center cursor-pointer' onClick={()=>{setnetworkModel(true)}} >
                    <div className='flex  '>
                        <div >
                            <img src={selectedNetTo?.networkiconUrl} />
                        </div>
                        <div className='ml-3'>
                            <p className='text-[#032FA1] font-bold '>{selectedNetTo?.networkName}</p>
                            <span className='font-extralight text-[#032FA1]'>{selectedNetTo?.networkType}</span>
                        </div>
                    </div>
                    <div className=''>
                        <MdKeyboardArrowDown size={35}  className='px-2 py-2 bg-white rounded-full'/>
                    </div>
                </div>
                
            </div>
            <SelectModel show={tokenModel} hide={hideTokenModel} />
            <SelectNetwork show={networkModel} hide={hideNetwokModel} component={"to"}/>
        </div>
    )
}
