import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ImageDescription from '../components/ItemDescription/ImageDescription'
import Sections from '../components/ItemDescription/Sections'
import meta from '../assets/dummy.json'
import { useParams } from 'react-router-dom'

export default function ItemDesciption() {

  const [auction, setAuction] = useState(meta)
  const id = useParams().item

  const fetchAuction = async () => {
    const res = await axios.get(`http://localhost:5000/auctionData/getItem?auction_id=${id}`)
    setAuction(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    fetchAuction()
  }, [])

  return (
    <>
      <ImageDescription meta={auction}/>
      <Sections meta={auction} />
    </>
  )
}

