import React from 'react'
import ImageDescription from '../components/Profile/ImageDescription'
import Sections from '../components/Profile/Sections'
import meta from '../assets/profile_dummy.json'

export default function Profile() {
  return (
    <>
      <ImageDescription meta={meta}/>
      <Sections meta={meta} />
    </>
  )
}

