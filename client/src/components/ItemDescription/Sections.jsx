import React, {useState} from 'react'
import '../../css/ItemDescription/Sections.css'
import Details from './Details'
import BidHistory from './BidHistory'
import MakeBid from './MakeBid'
import { toast } from 'react-toastify'

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
            <div className='col clk' onClick={() => {setActive('details')}}>
                Details
            </div>
            <div className='col clk' onClick={() => {setActive('bid_history')}} style={{borderLeft: '1px solid grey', borderRight: '1px solid grey'}}>
                Bid History
            </div>
            <div className='col clk' onClick={() => {
                if (!props.meta.block_data.started) {
                    toast.info("Auction has not started")
                } else {
                    setActive('make_a_bid')}}
                }>
                Make a Bid
            </div>
            
        </div>

        <div className='row'>
            {renderSection()}
        </div>
    </div>
  )
}
