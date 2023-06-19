import React from "react";
import '../css/AuctionList.css'
import AuctionItem from "./AuctionItem";

const AuctionList = props => {
    if(props.items.length === 0){
        return (
            <div className="center">
                <h2>No item found</h2>
            </div>
        )
    }

    return <ul>
        {props.items.map(items => {
            return <AuctionItem 
            key = {items.id}
            id = {items.id}
            image ={items.image}
            name ={items.image}
            desc= {items.desc}
            />
        })}
    </ul>
}

export default AuctionList;