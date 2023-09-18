import React from 'react'
import '../../css/ItemDescription/Sections.css'

export default function Details(props) {

  const timeString = (val) => {
    const date = new Date(parseInt(val) * 1000)
    return date.toDateString() + ' ' + date.toLocaleTimeString().substring(0, 5)
  }
    
  return (
    <div style={{marginTop: '4%', marginLeft: '2%', width: '100%'}}>
      <div className='row' style={{fontSize: '20px', fontWeight: 'bold'}}>
        Product Details
    </div>
    <div className='row' style={{marginTop: '2%', textAlign: 'justify', marginRight: '3%'}}>
        {props.meta.central_data.description}
    </div>

    <div className='row' style={{fontSize: '20px', fontWeight: 'bold', marginTop: '2%'}}>
        Timeline
    </div>

    <div className='row' style={{fontSize: '15px', marginTop: '1%'}}>
        <div className='col'>
        Started: {timeString(props.meta.block_data.starting_time)}
        </div>
        <div className='col'>
        Ends: {timeString(props.meta.block_data.end_time)}
        </div>
        <div className='col'>
        Time Left: {props.meta.block_data.start_time}
        </div>
    </div>
    </div>
  )
}
