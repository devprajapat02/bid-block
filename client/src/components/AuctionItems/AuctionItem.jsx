import React from "react";
import '../../css/AuctionItems/AuctionItem.css'
import Card from "../UIElements/Card";
import Button from '../FormElements/Button'
import { Link } from "react-router-dom";

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
                <Link to="/item/desc"><Button inverse>Bid</Button></Link>
                <Button to={'/item/:item/edit'}>Edit</Button>
                <Button danger>Delete</Button>
            </div>
            </Card>
        </li>
    );
}

export default AuctionItem; 