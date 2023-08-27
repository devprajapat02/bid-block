import React from 'react'
import {AiOutlineReload} from 'react-icons/ai'
import {IoTelescopeOutline} from 'react-icons/io5'

export default function Retry() {
  return (
    <div style={{marginTop: '20vh'}}>
        <IoTelescopeOutline color='white' size='100px'/>
        <h3 style={{color: 'white'}}>
            Oops! Could'nt load Data
        </h3>
            <AiOutlineReload color='white' size='50px' style={{cursor: 'pointer', borderRadius: '50%'}} onClick={() => {window.location.reload()}} />
    </div>
  )
}
