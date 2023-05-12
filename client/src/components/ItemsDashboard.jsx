import React from 'react'
import ItemCard from './ItemCard'

export default function ItemsDashboard() {
  return (
    <>
        <div style={{ width: "100%", marginTop:"80px"}}>
            <div className='row'>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
                <div className='col'>
                    <ItemCard />
                </div>
            </div>
        </div>
    </>
  )
}
