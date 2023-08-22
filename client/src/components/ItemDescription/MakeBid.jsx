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
  
  const fetchAccount = async () => {
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const res = await axios.post("http://localhost:5000/auctionData/getWithdrawalAmount", {
      address: account[0],
      auction_id: props.meta.block_data.auction_id
    })
    setWithdrawal(parseInt(res.data.amount)/1000)
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  const handleFormSubmit = async () => {
    // e.preventDefault()

    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
    let params = {
      address: addresses[0],
      auction_id: props.meta.block_data.auction_id,
      bid_value: bid - withdrawal
    }

    const res = await post("http://localhost:5000/makeBid", params, true, false)
    
    if (res.status === 200) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(params.address);
      res.data.tx.value = res.data.tx.value.hex
      const tx = await signer.sendTransaction(res.data.tx)
      await tx.wait()
      params.tx = tx.hash
      await post("http://localhost:5000/makeBid/mongo", params, true, true)
    }

  }

  const handleWithdraw = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const params = {
      address: accounts[0],
      auction_id: props.meta.block_data.auction_id
    }

    const res = await post("http://localhost:5000/withdrawBid", params, true, true)
    if (res.status === 201) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(accounts[0]);
      const tx = await signer.sendTransaction(res.data.tx)
      await tx.wait()
      toast.success('Bid Withdrawn')
    }
  }

  return (
    <div style={{marginTop: '5%', marginLeft: '2%'}}>
        <form onSubmit={() => handleFormSubmit()}>
          <div className='row'>
            <label htmlFor="bid" style={{}}>Bid Amount: {withdrawal} MATIC</label>
            <button type='button' disabled={withdrawal == 0} onClick={() => handleWithdraw()}>Withdraw</button>
          </div>
          <label>Make a Bid</label>
          <input 
            type="number"
            step="0.1"
            value={bid}
            onChange={(e) => {setBid(e.target.value)}}
            min={min_bid_value}
            placeholder="Enter Bid Amount" 
            style={{all: "unset", margin: '20px'}}
          ></input>
          <label>MATIC</label>
          <input 
            type="button" 
            value={`Pay ${(bid - withdrawal).toFixed(1)} MATIC`}
            disabled={bid < min_bid_value}
            onClick={() => {handleFormSubmit()}}
          ></input>
        </form>
    </div>
  )
}
