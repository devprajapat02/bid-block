import React from "react";

import Card from '../UIElements/Card';
import { Grid } from '@mantine/core';
import axios from 'axios';
import LiveItem from "./LiveItem";
import PastItem from "./PastItem";
import FutureItem from "./FutureItem";

const UserList = props => {
    if(props.items.length === 0){
        return (
            <div className="place-list center">
                <Card>
                    <h2>No item found</h2>
                </Card>
            </div>
        )
    }

    const addToDB = async (params) => {
        try {
            console.log(params)
            const res2 = await axios.post('http://localhost:5000/createAuction/mongo', params)
            console.log(res2.data);
        } catch (e) {
            console.log(e);
            console.log(params.tx)
        }
    }

    return <Grid >
        
        {props.items.map((item, id) => {
            if (props.type === 'ongoing'){
                return <LiveItem
                key = {id}
                auction_id = {item.auction_id}
                image ={item.image}
                title = {item.product_name}
                desc= {item.description}
                startingValue={item.base_price/1000}
                />
            }else if(props.type === 'past'){
                return <PastItem
                key = {id}
                auction_id = {item.auction_id}
                image ={item.image}
                title = {item.product_name}
                desc= {item.description}
                startingValue={item.base_price/1000}
                />
            }else if(props.type === 'upcoming'){
                return <FutureItem
                key = {id}
                auction_id = {item.auction_id}
                image ={item.image}
                title = {item.product_name}
                desc= {item.description}
                startingValue={item.base_price/1000}
                />
            }
            
        })}
    </Grid>
}

export default UserList;