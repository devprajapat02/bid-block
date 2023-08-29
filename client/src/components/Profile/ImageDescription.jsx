import React, {useRef} from 'react'
import '../../css/ItemDescription/ImageDescription.css'
import identicon from 'identicon.js'

export default function ImageDescription(props) {
  
    function stringToHex(str) {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            hex += str.charCodeAt(i).toString(16);
        }
        return hex;
    }

    const ImageViewer = () => {

        let img_src = props.meta.profile_image? props.meta.profile_image: `data:image/png;base64,${new identicon(stringToHex(props.meta.id), 250).toString()}`

        return (
            <div className='img_container' style={{position: 'relative', flex: '0.6', margin: '2% 0% 2% 2%'}}>
                <img src={img_src} alt="" height='100%' style={{borderRadius: '50%', aspectRatio: 1}} />
            </div>
        )
    }

    return (
    <>
        <div className='container row'>
                {ImageViewer()}
            <div className='col'>
                <div className='row item-title' style={{fontSize: '40px', fontWeight: 'bolder', marginTop: '2%'}}>
                    {props.meta.Name}
                </div>
                <div className='row item-title' style={{fontSize: '15px', color: 'grey', marginTop: '1%'}}>
                    ID: {props.meta.id}
                </div>
                <hr style={{width: '90%', marginTop: '5%', border: '1px solid rgb(50, 50, 50)'}} />
                <div className='row item-title' style={{fontSize: '20px', fontWeight: 'bold', marginTop: '5%'}}>
                    {props.meta.email}
                </div>
                {/* <div className='row item-title' style={{fontSize: '15px'}}>
                    {props.meta.address.local}, {props.meta.address.city}, ({props.meta.address.zip})
                </div>
                <div className='row item-title' style={{fontSize: '15px'}}>
                    {props.meta.address.state}, {props.meta.address.country}
                </div> */}
            </div>
        </div>
    </>
  )
}
