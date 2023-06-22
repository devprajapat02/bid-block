import React from "react";
import '../../css/AuctionItems/AuctionItem.css'
import Card from "../UIElements/Card";

const AuctionItem = props => {
    return (
        <li className="place-item">
            <Card className="place-item__content">
            <div className="place-item__image">
                <img src={props.image} alt={props.title}/>
            </div>
            <div className="place-item__info">
                <h2>{props.title}</h2>
                <h3>${props.startingValue}</h3>
                <p>{props.desc}</p>
            </div>
            <div className="place-item__actions">
                <button>Bid</button>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            </Card>
        </li>
    );
}

export default AuctionItem; 