import React, {useState, useEffect} from 'react'
import { Loader } from '@mantine/core';
import Retry from './Retry'

export default function LoaderGeneric() {

    const [retry, setRetry] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setRetry(true)
        }, 8000)
    })

  return retry?(
    <Retry />
  ): (
    <div className="place-list center" style={{background: "#4d4d4d",marginTop:"40px"}}>
        <Loader variant="bars" color="white" sz="xl" />
    </div>
  )
}
