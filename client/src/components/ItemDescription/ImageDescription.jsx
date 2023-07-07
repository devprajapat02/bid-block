import React from 'react'
import '../../css/ItemDescription/ImageDescription.css'
// import 'bootstrap/dist/css/bootstrap.css';

export default function ImageDescription(props) {
  
    const sample = {id: '0xwokgwpjpwjprjpwjrowj', title :'boat',image:"https://images.hindustantimes.com/auto/img/2022/05/31/1600x900/Land_Rover_Defender_130___3_1653991863473_1653992022869.jpg",desc:"bububb",creatorId:"u1",startingValue:1000}
    
    return (
    <>
        <div className='container row'>
            <div className='col'>
                <img src={props.meta.central_data.images[0]} alt="" height="100%" width="100%" />
            </div>
            <div className='col'>
                <div className='row item-title' style={{fontSize: '40px', fontWeight: 'bolder', marginTop: '2%'}}>
                    {props.meta.block_data.product.product_name}
                </div>
                <div className='row item-title' style={{fontSize: '15px', color: 'grey'}}>
                    ID: {props.meta.block_data.auction_id}
                </div>
                <hr style={{width: '90%', marginTop: '5%', border: '1px solid rgb(50, 50, 50)'}} />
                <div className='row item-title' style={{fontSize: '25px', fontWeight: 'bold', marginTop: '5%'}}>
                    {props.meta.block_data.highest_bid} MATIC
                </div>
                <div className='row item-title' style={{fontSize: '15px'}}>
                    Base Price: {props.meta.block_data.product.base_price} MATIC
                </div>
            </div>
        </div>
    </>
  )
}
