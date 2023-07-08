import React, {useState, useRef} from 'react'
import '../../css/ItemDescription/ImageDescription.css'
// import 'bootstrap/dist/css/bootstrap.css';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";


export default function ImageDescription(props) {
  
    const sample = {id: '0xwokgwpjpwjprjpwjrowj', title :'boat',image:"https://images.hindustantimes.com/auto/img/2022/05/31/1600x900/Land_Rover_Defender_130___3_1653991863473_1653992022869.jpg",desc:"bububb",creatorId:"u1",startingValue:1000}

    const ImageViewer = () => {

        const [imageIndex, setImageIndex] = useState(0)
        const imageRefs = useRef(Array(props.meta.central_data.images.length).fill(0).map(() => React.createRef()))
        const kref = useRef(null)

        const changeImage = (dir, newId = null) => {

            let newIndex = newId == null? (imageIndex + dir + props.meta.central_data.images.length) % props.meta.central_data.images.length: newId
            imageRefs.current[newIndex].current.checked = true
            imageRefs.current[imageIndex].current.checked = false
            setImageIndex(newIndex)
        }

        return (
            <div className='col' style={{position: 'relative'}}>

                <img src={props.meta.central_data.images[imageIndex]} alt="" height="100%" width="100%" style={{position: 'relative', display: 'inline-block'}} />
                
                <div style={{position: 'relative', top: "-10%", left: '40%', width: '20%'}}>
                {props.meta.central_data.images.map((image, index) => {
                    const radio_id = 'image_ptr' + index
                    if (index === 0) return (
                        <input type="radio" name="" id={radio_id} ref={imageRefs.current[index]} defaultChecked onClick={() => {changeImage(0, index)}} />
                    )
                    return (
                        <input type="radio" name="" id={radio_id} ref={imageRefs.current[index]} onClick={() => {changeImage(0, index)}} />
                    )
                })}
                </div>

                <div style={{position: 'absolute', top: "0%", left: '0%', margin: '1vh', height:'38vh', width: '5vb'}}>
                    <button className='image_arrow left' onClick={() => {changeImage(-1)}}><CiCircleChevLeft /></button>
                </div>
                <div style={{position: 'absolute', top: "0%", right: '0%', margin: '1vh', height:'38vh', width: '5vb', backgroundColor: 'transparent'}}>
                    <button className='image_arrow right' onClick={() => {changeImage(1)}}><CiCircleChevRight /></button>
                </div>
            </div>
        )
    }

    return (
    <>
        <div className='container row'>
                {ImageViewer()}
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
                <div className='row item-title' style={{fontSize: '15px', marginTop: '4vh'}}>
                    {props.meta.central_data.address.local}, {props.meta.central_data.address.city}, ({props.meta.central_data.address.zip})
                </div>
                <div className='row item-title' style={{fontSize: '15px'}}>
                    {props.meta.central_data.address.state}, {props.meta.central_data.address.country}
                </div>
            </div>
        </div>
    </>
  )
}
