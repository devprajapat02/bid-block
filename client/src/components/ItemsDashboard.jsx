import React from 'react'
import ItemCard from './ItemCard'

export default function ItemsDashboard() {
  
  const len = 15

	const row_length = (it) =>  {
		// return (len - 4*it < 4) ? len - 4*it : 4
		if (len - 4*it < 4) return len - 4*it
		else return 4
	}

	return (
    <>
        <div style={{ width: "99%", marginTop:"80px"}}>
            {[...Array(Math.round(len/4))].map((e, i) => {

							return (
								<div className='row'>
									{[...Array(row_length(i))].map((e, j) => {return (
										<div className='col-3'><ItemCard key={4*i + j} /></div>
									)})}
								</div>
						)})}
        </div>
    </>
  )
}
