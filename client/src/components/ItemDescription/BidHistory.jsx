import React from 'react'
import '../../css/ItemDescription/Sections.css'
// import bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css'

export default function BidHistory(props) {
  console.log(props.meta.block_data.bids)
  return (
    <div className='grid' style={{marginTop: '5%', height: '27vh', overflow: 'auto'}}>
    <div className='row'>
      <div className='col' >S.No</div>
      <div className='col' >Timestamp</div>
      <div className='col'  style={{flex: '60%'}}>Bidder Address</div>
      <div className='col' >Bid Amount</div>
    </div>

    {props.meta.block_data.bids.map((item, index) => {
      const rowColor = index % 2 == 0 ? 'rgb(30, 30, 30)' : 'black'
      const _style = {
        backgroundColor: rowColor,
        height: '5vh',
      }
      const _ret = <div className='row' key={index} style={_style}>
        <div className='col' >{index+1}</div>
        <div className='col' >{item.bid_time}</div>
        <div className='col'  style={{flex: '60%'}}>{item.bidder}</div>
        <div className='col' >{item.bid_amount} MATIC</div>
      </div>
      return (
        _ret
      )
    })}
    </div>
  )
}
