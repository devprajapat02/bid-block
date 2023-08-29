import React, { useState, useEffect } from 'react'
import '../../css/Skeleton/skeleton.css'
import '../../css/ItemDescription/ImageDescription.css'
import '../../css/ItemDescription/Sections.css'
import Retry from '../../utils/Retry'

export default function LoadingComps() {

    const [retry, setRetry] = useState(false)

    const ImageViewer = () => {

        return (
            <div className='img_container col' style={{position: 'relative'}}>
                <img className='skeleton' src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" height='100%' width="100%" style={{borderRadius: '5%'}} />
            </div>
        )
    }

    useEffect(() => {
        setTimeout(() => {
            setRetry(true)
        }, 8000)
    }, [])


    return retry?(
        <Retry />
    ): (
    <>
        <div className='container row'>
                {ImageViewer()}
            <div className='col'>
            <div className='row item-title skeleton' style={{fontSize: '40px', fontWeight: 'bolder', marginTop: '2%'}}>
                    props.meta
                </div>
                <div className='row item-title skeleton' style={{fontSize: '15px', marginTop: '1%'}}>
                    props.meta
                </div>
                <hr style={{width: '90%', marginTop: '5%', border: '1px solid rgb(50, 50, 50)'}} />
                <div className='row item-title skeleton' style={{fontSize: '25px', fontWeight: 'bold', marginTop: '5%'}}>
                    props.meta
                </div>
                <div className='row item-title skeleton' style={{fontSize: '15px', marginTop: '1%'}}>
                    parseInt
                </div>
            </div>
        </div>

    <div className='container'>
    <div className='row'>
        <div className='col clk'>
            Details
        </div>
        <div className='col clk' style={{borderLeft: '1px solid grey', borderRight: '1px solid grey'}}>
            Bid History
        </div>
        <div className='col clk'>
            Make a Bid
        </div>
        
    </div>

    <div className='row'>
        <div className='grid skeleton' style={{marginTop: '3%', height: '27vh', overflow: 'auto'}}>
    <div className='row'>
      <div className='col' >S.No</div>
      <div className='col' >Timestamp</div>
      <div className='col'  style={{flex: '55%'}}>Auction ID</div>
      <div className='col' >Bid Amount</div>
      <div className='col' >View Auction</div>
    </div>

    {Array([1, 2, 3, 4]).map((item, index) => {
      const rowColor = index % 2 == 0 ? 'rgb(30, 30, 30)' : 'black'
      const _style = {
        backgroundColor: rowColor,
        height: '10px'
      }
      const _ret = <div className='row skeleton' key={index} style={_style}>
        <div className='col' ></div>
        <div className='col' ></div>
        <div className='col'  style={{flex: '55%'}}></div>
        <div className='col' ></div>
        <div className='col' ></div>
      </div>
      return (
        _ret
      )
    })}
    </div>
    </div>
    </div>
    </>
  )
}
