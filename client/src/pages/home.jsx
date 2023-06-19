import React from "react";

import AuctionList from "../components/AuctionList";

function Home(){
    const Auctionitems =[
        {id: 'u1', name :'boat',image:"",desc:"bububb"},
        {id: 'u2', name :'car',image:"",desc:"gguyguy"},
                        ]

    return <AuctionList items={Auctionitems} />;
    // return <h1>Home</h1>
}

export default Home;