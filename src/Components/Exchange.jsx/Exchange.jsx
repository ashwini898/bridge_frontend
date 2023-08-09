import React, { useState, useEffect, useRef } from "react";
import From from "./From";
import To from "./To";
import Reminder from "./Reminder";
import SwitchModel from "../../Model/SwitchModel";
import { AiOutlineArrowDown } from "react-icons/ai";
import swal from "sweetalert";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { network, getValue } from "../../assert/network";
import "./index.css";
import { ethers } from "ethers";
import ApiServices from "../../Services/ApiServices";
import {
  avaltopoly,
  avalApprove,
  avaltorgb,
  polytorgb,
  polyApprove,
  polytoaval,
  rgbTransfer,
  avalWithdrawal,
  polyWithdrawal,
  rgbWithdrawal
} from "../../Apis/Endpoint";
export default function () {
  const { isConnected, address } = useAccount();
  const { chain, chains } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [switchModel, setSwitchModel] = useState(false);
  const [switchModelValue, setSwitchModelValue] = useState("");
  const [btn, setBtn] = useState("Approve");
  const [resvWallat, setResvWallat] = useState("");
  const [blindUtxo, setBlindUtxo] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [RGB20_asset,SetRGB20_asset] = useState([]);
  const [provider, setProvider] = useState(null);
  const [signer,setSigner] = useState(null);
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
   

   useEffect(()=>{
    console.log("useEffect")
    if(typeof window.ethereum !=='undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider)
      setSigner(provider.getSigner());
    } else{
      swal({
        title:"Oops",
        text:"Please install Metamask extension in your browser",
        icon:"error"
      }).then(()=>{
          
     // setTimeout(() => {
        window.location.href = "https://metamask.io/download/"; // Redirect to another link
    //  }, 5000); // 5000 milliseconds = 5 seconds
    console.error('Ethereum provider is missing. Please install MetaMask or another compatible wallet extension.');
      })
    
    }

   },[])   
   
    
  async function handleTransfer() {
    console.log("Transfer button");
    if(resvWallat == ""){
      swal("Oops!","Please Enter receiver wallet address","error")
      return;
    }
    if (tokenAmount == "") {
      swal("Oops!", "Please Enter Token Amount", "error");
      return;
    }

    if (!isConnected) {
      swal("Opps!", "Please Connect the Wallet", "error");
      return;
    }
    if (chain.id != selectedNetFrom?.chainId) {
      swal(
        "Opps!",
        `Please switch the network to ${
          selectedNetFrom.networkName != "Avalanche" ? "Polygon" : "Avalanche"
        }`,
        "error"
      ).then(async (value) => {
        const ChainId =
          selectedNetFrom.networkName != "Avalanche" ? "80001" : "43113";
        try {
          const hexChainId = "0x" + parseInt(ChainId).toString(16);
          setSwitchModelValue("Wait Network is Switching ....");
          setSwitchModel(true);
          switchNetworkAsync(hexChainId).then(() => {
            setSwitchModel(false);
          });
        } catch (err) {
          swal(
            "Opps!",
            "Something went wrong while switching network",
            "error"
          );
          return;
        }
      });
    } else {
     

      const from = selectedNetFrom?.networkName;
      const to = selectedNetTo?.networkName;
      const body = {
        address: address,
        amount: tokenAmount,
        rgbAddress: resvWallat,
        user: "sinobeesaurav@gmail.com",
      };
      if (from == "Avalanche" && to == "Polygon") {
        if (btn == "Approve") approve(avalApprove, body);
        else deposit(avaltopoly, body,to);
      } else if (from == "Polygon" && to == "Avalanche") {
        if (btn == "Approve") approve(polyApprove, body);
        else deposit(polytoaval, body,to);
      } else if (from == "Avalanche" && to == "RGB") {
        if (btn == "Approve") approve(avalApprove, body);
        else deposit(avaltorgb, body,to);
      } else {
        if (btn == "Approve") approve(polyApprove, body);
        else deposit(polytorgb, body,to);
      }
    }
  }

  const [selectedToken, setSelectedToken] = useState({
    tokenSymbol: "TTK1",
    tokenName: "TTKCoin1",
    tokeniconurl:
      "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    id: 0,
  });
  const [selectedNetFrom, setselectedTokenFrom] = useState({
    networkiconUrl:
      "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574",
    networkName: "Avalanche",
    networkType: "Testnet",
    chainId: "43113",
  });
  const [selectedNetTo, setSelectedNetTo] = useState({
    networkiconUrl:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
    networkName: "Polygon",
    networkType: "Testnet",
    chainId: "80001",
  });

  async function approve(path, body,to) {
    console.log(path);
    setSwitchModel(true);
    setSwitchModelValue("Wait metamask is opening for approval");
    ApiServices.post(path, body)
      .then((res) => {
        signer
          .sendTransaction({
            to: res.data.to,
            data: res.data.approveData,
            gasLimit: 500000,
          })
          .then((transaction) => {
            setSwitchModelValue("Wait for confirmation from metamask");
            return transaction.wait();
          })
          .then((result) => {
            console.log("173 ",result)
            if (result.status === 1) {
             
              setBtn("Transfer");
              setSwitchModel(false);
              swal("Success", "Approval is successfull", "success");
              //handleWidthdrawal(address,tokenAmount,resvWallat,to)
            }
          })
          .catch((err) => {
            console.log(err)
            setSwitchModel(false);
            swal("Fail", "token is not available ", "error");
          });
      })
      .catch((err) => {
        setSwitchModel(false);
        swal("Opps!", "Something went wrong..", "error");
      });
  }

  async function deposit(path, body,to) {
    console.log(path);
    setSwitchModel(true);
    setSwitchModelValue("Wait metamask is opening for transaction");
    ApiServices.post(path, body)
      .then((res) => {
        signer
          .sendTransaction({
            to: res.data.to,
            data: res.data.depositData,
            gasLimit: 500000,
          })
          .then((transaction) => {
            setSwitchModelValue("Wait for confirmation from meatamask");
            return transaction.wait();
          })
          .then((result) => {

            if (result.status === 1) {
              setBtn("Approve");
              setSwitchModel(false);
              swal("Success", "Transfer is successfull", "success");
               handleWidthdrawal(address,tokenAmount,resvWallat,to)
            }
          })
          .catch((err) => {
            setSwitchModel(false);
            swal("Fail", "Token is not available", "error");
          });
      })
      .catch((err) => {
        setSwitchModel(false);
        swal("Opps!", "Something went wrong..", "error");
      });
  }
   function handleWidthdrawal(address,tokenAmount,resvWallat,to){
      const body = {
        destinationAddress:address,
        amount:tokenAmount,
        rgbWalletAddress:resvWallat
      }

      if(to=="Avalanche"){

      }else if(to=="Polygon"){

      }else{
        setSwitchModel(true);
        setSwitchModelValue("Wait for confirmation from rgb")
          ApiServices.post(rgbWithdrawal,body).then((res)=>{
            console.log(res.data)
             const status = res.data.data.data.status;
             const msg = res.data.data.data.msg;
             const RGB20_asset_transfers = res.data.data.data.RGB20_asset_transfers;
             console.log("212",RGB20_asset_transfers)
             SetRGB20_asset(prevArray => [...prevArray, ...RGB20_asset_transfers])
             console.log("214",RGB20_asset)
    
             console.log(status,msg)
             if(status=='ok'){
              setSwitchModel(false);
              swal('success',"Token Transfer successfully",'success')
             }else{
              setSwitchModel(false)
               swal("opps!",msg,'error')
             }
          })
      }
   }

   if(provider===null){
    return(
      <div>
      
      <p >Ethereum provider is missing. Please <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="link-red">
    install MetaMask
  </a> or another compatible wallet extension.</p>
    </div>
    );
   }
  return (
    <div>
      <h1 className="font-medium text-2xl m-3">EVM</h1>
      <div className="m-3">
        <From
          setselectedTokenFrom={setselectedTokenFrom}
          selectedNetFrom={selectedNetFrom}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          setSelectedNetTo={setSelectedNetTo}
          tokenAmount={tokenAmount}
          setTokenAmount={setTokenAmount}
          selectedNetTo={selectedNetTo}
        />
        <div className="my-5 flex justify-center">
          <AiOutlineArrowDown size={30} />
        </div>
        <To
          selectedNetTo={selectedNetTo}
          setSelectedNetTo={setSelectedNetTo}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          selectedNetFrom={selectedNetFrom}
          tokenAmount={(tokenAmount / 100) * 99}
          setResvWallat={setResvWallat}
          setBlindUtxo={setBlindUtxo}
          resvWallat={resvWallat}
          blindUtxo={blindUtxo}
        />
      </div>
      <Reminder />
      <div className="flex justify-center">
        <button
          className="py-4 px-36  text-white bg-[#3b80ee] rounded-lg hover:bg-violet-600"
          onClick={handleTransfer}>
          {btn}
        </button>
      </div>
      <SwitchModel show={switchModel} value={switchModelValue} />
      <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500 text-red-500">
            <tr>
              <th scope="col" class="px-6 py-4">Idx</th>
              <th scope="col" class="px-6 py-4">CreatedAt</th>
              <th scope="col" class="px-6 py-4">UpdatedAt</th>
              <th scope="col" class="px-6 py-4">Kind</th>
              <th scope="col" class="px-6 py-4">Status</th>
              <th scope="col" class="px-6 py-4">Txid</th>
              <th scope="col" class="px-6 py-4">Amount</th>
            </tr>
          </thead>
          <tbody>
               {
                 RGB20_asset.map((data)=>(
                  <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">{data.idx}</td>
                  <td class="whitespace-nowrap px-6 py-4">{
                   new Date(data.created_at * 1000).toLocaleString() // Convert to milliseconds
                  }</td>
                  <td class="whitespace-nowrap px-6 py-4">{
                  new Date(data.updated_at * 1000).toLocaleString()
                  }</td>
                  <td class="whitespace-nowrap px-6 py-4">{data.kind}</td>
                  <td class="whitespace-nowrap px-6 py-4">{data.status}</td>
                  <td class="whitespace-nowrap px-6 py-4">{data.txid}</td>
                  <td class="whitespace-nowrap px-6 py-4">{data.amount}</td>
                </tr>
                 ))
                 
               }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

