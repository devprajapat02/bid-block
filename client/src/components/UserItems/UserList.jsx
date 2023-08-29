import React from "react";

import Card from '../UIElements/Card';
import { Grid } from '@mantine/core';
import LiveItem from "./LiveItem";
import PastItem from "./PastItem";
import FutureItem from "./FutureItem";

const UserList = props => {
    console.log(props)
    if(props.items.length === 0){
        return (
            <div className="place-list center">
                <Card>
                    <h2>No item found</h2>
                    <button>Auction Item</button>
                </Card>
            </div>      
        )
    }

    return <Grid >
        
        {props.items.map((item, id) => {
            if (props.type === 'ongoing'){
                return <LiveItem
                key = {id}
                auction_id = {item.auction_id}
                image ={item.images[0]}
                title = {item.product_name}
                desc= {item.description}
                startingValue={item.base_price/1000}
                />
            }else if(props.type === 'past'){
                return <PastItem
                key = {id}
                auction_id = {item.auction_id}
                image ={item.images[0]}
                title = {item.product_name}
                desc= {item.description}
                startingValue={item.base_price/1000}
                highest_bid={item.highest_bid/1000}
                />
            }else if(props.type === 'upcoming'){
                return <FutureItem
                key = {id}
                auction_id = {item.auction_id}
                image ={item.images[0]}
                title = {item.product_name}
                desc= {item.description}
                startingValue={item.base_price/1000}
                starting_time={item.starting_time}
                />
            }
            
        })}
    </Grid>
}

export default UserList;