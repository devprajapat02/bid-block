import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import '../../css/ItemDescription/Sections.css'
import post from '../../utils/post'
import { toast } from 'react-toastify'

export default function MakeBid(props) {
  
  const min_bid_value = props.meta.block_data.highest_bid.bid_amount == ''? parseInt(props.meta.block_data.base_price)/1000 : parseInt(props.meta.block_data.highest_bid.bid_amount)/1000
  const [bid, setBid] = useState(min_bid_value)
  const [withdrawal, setWithdrawal] = useState(0)
  const [loader, setLoader] = useState(true)
  
  const fetchAccount = async () => {
    setLoader(true)
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const res = await axios.post("https://bid-block-server.onrender.com/auctionData/getWithdrawalAmount", {
      address: account[0],
      auction_id: props.meta.block_data.auction_id
    })
    setWithdrawal(parseInt(res.data.amount)/1000)
    setLoader(false)
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  const handleFormSubmit = async () => {
    // e.preventDefault()

    if (props.meta.block_data.ended) {
      toast.info("Auction has ended")
      return
    }

    if (withdrawal == 0) {
      await fetchAccount()
    }
    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
    let params = {
      address: addresses[0],
      auction_id: props.meta.block_data.auction_id,
      bid_value: bid - withdrawal
    }

    const res = await post("https://bid-block-server.onrender.com/makeBid", params, true, false)
    
    if (res.status === 200) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(params.address);
      res.data.tx.value = res.data.tx.value.hex
      const tx = await signer.sendTransaction(res.data.tx)
      await tx.wait()
      params.tx = tx.hash
      await post("https://bid-block-server.onrender.com/makeBid/mongo", params, true, true)
    }

  }

  const handleWithdraw = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const params = {
      address: accounts[0],
      auction_id: props.meta.block_data.auction_id
    }

    const res = await post("https://bid-block-server.onrender.com/withdrawBid", params, true, true)
    if (res.status === 201) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(accounts[0]);
      const tx = await signer.sendTransaction(res.data.tx)
      await tx.wait()
      toast.success('Bid Withdrawn')
    }
  }

  const buttonStyle = {all: "unset", margin: '20px', padding: '10px', borderRadius: '5%', cursor: withdrawal == 0? 'not-allowed': 'pointer', backgroundColor: 'rgb(200, 50, 100)'}
  const submitStyle = {all: "unset", margin: '20px', padding: '10px', cursor: loader? 'not-allowed': 'pointer', backgroundColor: 'rgb(20, 100, 200)'}

  return (
    <div style={{paddingTop: '4%', marginLeft: 'auto', marginRight: 'auto'}}>
        <form onSubmit={() => handleFormSubmit()}>
          <div className=''>
            <label htmlFor="bid" style={{padding: '10px', backgroundColor: 'rgb(20, 20, 20)'}}>Invested:</label>
            <label htmlFor='bid' style={{padding: '10px', backgroundColor: 'rgb(40, 40, 40)'}}>{withdrawal} MATIC</label>
            <button type='button' style={buttonStyle}
             disabled={withdrawal == 0} onClick={() => handleWithdraw()}>Withdraw</button>
          </div>
          <label>Make a Bid</label>
          <input 
            type="number"
            step="0.1"
            value={bid}
            onChange={(e) => {setBid(e.target.value)}}
            min={min_bid_value}
            placeholder="Enter Bid Amount" 
            style={{all: "unset", padding: '10px 0 10px 10px', margin: '20px 0 20px 20px', backgroundColor: 'rgb(40, 40, 40)', borderRadius: '5%'}}
          ></input>
          <label style={{padding: '10px', backgroundColor: 'rgb(20, 20, 20)'}}>MATIC</label>  
          <input 
            type="button" 
            value={`Pay ${(bid - withdrawal).toFixed(1)} MATIC`}
            disabled={bid < min_bid_value || loader}
            onClick={() => {handleFormSubmit()}}
            style={submitStyle}
          ></input>
        </form>
    </div>
  )
}
