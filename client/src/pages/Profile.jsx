import React, { useEffect, useState } from 'react'
import ImageDescription from '../components/Profile/ImageDescription'
import Sections from '../components/Profile/Sections'
import meta from '../assets/profile_dummy.json'
import axios from 'axios'
import LoadingComps from '../components/Profile/LoadingComps'

export default function Profile() {

  const [userData, setUserData] = useState(meta)
  const [loader, setLoader] = useState(true)

  const fetchProfile = async () => {
    setLoader(true)
    const res = await axios.post('https://bid-block-server.onrender.com/userData/id', {}, {withCredentials: true})
    setUserData(res.data.user)
    console.log(res.data.user)
    setLoader(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [])


  return loader?
  (
    <LoadingComps />
  ):
  (
    <>
      <ImageDescription meta={userData} />
      <Sections meta={userData} />
    </>
  )
}

