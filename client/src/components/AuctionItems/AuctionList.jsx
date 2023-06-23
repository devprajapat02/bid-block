import React from "react";

import Card from '../UIElements/Card';
import '../../css/AuctionItems/AuctionList.css'
import AuctionItem from "./AuctionItem";

const AuctionList = props => {
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

    return <ul>
        {props.items.map(items => {
            return <AuctionItem 
            key = {items.id}
            id = {items.id}
            image ={items.image}
            title = {items.title}
            desc= {items.desc}
            creatorId={items.creatorId}
            startingValue={items.startingValue}
            />
        })}
    </ul>
}

export default AuctionList;