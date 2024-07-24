import { useState,useEffect } from 'react'
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import chai from "./chai.png";
import './App.css'

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not connected');
  useEffect(()=>{
    const template=async()=>{
   
      const contractAddres="0xdb4A809f904F45402a21EF8D04C86AFe81461C44";
      const contractABI=abi.abi;
      try{

        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
 
        window.ethereum.on("accountsChanged",()=>{
         window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
      setState({provider,signer,contract});
       
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    <div style={{backgroundColor: "#EFEFEF", height: "100%"}}>
    <img src={chai} className="img-fluid" alt=".." width="100%"/>
    <p 
      class="text-muted lead"
      style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account - {account}</small>
    </p>
    <div className='container'>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  </div>

  )
}

export default App
