import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ImageDescription from '../components/ItemDescription/ImageDescription'
import Sections from '../components/ItemDescription/Sections'
import LoadingComps from '../components/ItemDescription/LoadingComps'
import meta from '../assets/dummy.json'
import { useParams } from 'react-router-dom'

export default function ItemDesciption() {

  const [auction, setAuction] = useState(meta)
  const [loader, setLoader] = useState(true)
  const id = useParams().item

  const fetchAuction = async () => {
    setLoader(true)
    const res = await axios.get(`https://bid-block-server.onrender.com/auctionData/getItem?auction_id=${id}`)
    if (res.status != 200) return
    setAuction(res.data)
    console.log(res.data)
    setLoader(false)
  }

  useEffect(() => {
    fetchAuction()
  }, [])

  return loader?
  (
    <LoadingComps />
  ):
  (
    <>
      <ImageDescription meta={auction}/>
      <Sections meta={auction} />
    </>
  )
}

