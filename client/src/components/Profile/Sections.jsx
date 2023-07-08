import React, {useState} from 'react'
import '../../css/ItemDescription/Sections.css'
import Details from './Details'
import BidHistory from './BidHistory'
import MakeBid from './MakeBid'

export default function Sections(props) {

    const [active, setActive] = useState('details')

    const renderSection = () => {
        if (active == 'bid_history') return <BidHistory meta={props.meta}/>
        else if (active == 'make_a_bid') return <MakeBid meta={props.meta}/>
        else return <Details meta={props.meta}/>
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                My Bids
            </div>
            
            
        </div>

        <div className='row'>
            <BidHistory meta={props.meta} />
        </div>
    </div>
  )
}
