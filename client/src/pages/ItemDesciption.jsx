import React from 'react'
import ImageDescription from '../components/ItemDescription/ImageDescription'
import Sections from '../components/ItemDescription/Sections'
import meta from '../assets/dummy.json'

export default function ItemDesciption() {
  return (
    <>
      <ImageDescription meta={meta[0]}/>
      <Sections meta={meta[0]} />
    </>
  )
}

