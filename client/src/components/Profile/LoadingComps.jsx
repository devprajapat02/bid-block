import React, { useState, useEffect } from 'react'
import '../../css/Skeleton/skeleton.css'
import '../../css/ItemDescription/ImageDescription.css'
import '../../css/ItemDescription/Sections.css'
import Retry from '../../utils/Retry'

export default function LoadingComps() {

    const [retry, setRetry] = useState(false)

    const ImageViewer = () => {

        return (
            <div className='img_container ' style={{position: 'relative', flex: '0.6', margin: '2% 0% 2% 2%', backgroundColor: "black"}}>
                <img className='skeleton' src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" height='100%' style={{borderRadius: '50%', aspectRatio: 1}} />
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
            <div className='col' style={{paddingRight: '5%'}}>
                <div className='row item-title skeleton' style={{fontSize: '40px', fontWeight: 'bolder', marginTop: '2%'}}>
                    props.meta.Name
                </div>
                <div className='row item-title skeleton' style={{fontSize: '15px', marginTop: '1%'}}>
                    ID: props.meta.id
                </div>
                <hr style={{width: '90%', marginTop: '5%', border: '1px solid rgb(50, 50, 50)'}} />
                <div className='row item-title skeleton' style={{fontSize: '20px', fontWeight: 'bold', marginTop: '5%'}}>
                    props.meta.email
                </div>
                <div className='row item-title skeleton' style={{fontSize: '15px'}}>
                    props.meta.address.local
                </div>
                <div className='row item-title skeleton' style={{fontSize: '15px'}}>
                    props.meta.address.state
                </div>
            </div>
        </div>

    <div className='container'>
    <div className='row'>
        <div className='col'>
            My Bids
        </div>
        
        
    </div>

    <div className='row'>
        <div className='grid' style={{marginTop: '3%', height: '27vh', overflow: 'auto'}}>
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
