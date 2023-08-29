import React from 'react'
import '../../css/ItemDescription/Sections.css'


export default function BidHistory(props) {
  return (
    <div className='grid' style={{marginTop: '3%', height: '27vh', overflow: 'auto'}}>
    <div className='row'>
      <div className='col' >S.No</div>
      <div className='col' >Timestamp</div>
      <div className='col'  style={{flex: '55%'}}>Auction ID</div>
      <div className='col' >Bid Amount</div>
      <div className='col' >View Auction</div>
    </div>

    {props.meta.bid_history.map((item, index) => {
      const rowColor = index % 2 == 0 ? 'rgb(30, 30, 30)' : 'black'
      const _style = {
        backgroundColor: rowColor
      }
      const _ret = <div className='row' key={index} style={_style}>
        <div className='col' >{index+1}</div>
        <div className='col' >{item.bid_time}</div>
        <div className='col'  style={{flex: '55%'}}>{item.auction_id}</div>
        <div className='col' >{item.bid_value} MATIC</div>
        <div className='col' ><a href="">View</a></div>
      </div>
      return (
        _ret
      )
    })}
    </div>
  )
}
