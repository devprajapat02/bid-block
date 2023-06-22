import React from "react";

import AuctionList from "../components/AuctionItems/AuctionList";

function Home(){
    const Auctionitems =[
        {id: 'u1', title :'boat',image:"https://images.hindustantimes.com/auto/img/2022/05/31/1600x900/Land_Rover_Defender_130___3_1653991863473_1653992022869.jpg",desc:"bububb",creatorId:"u1",startingValue:1000},
        {id: 'u2', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
                        ]

    return <AuctionList items={Auctionitems} />;
    // return <h1>Home</h1>
}

export default Home;