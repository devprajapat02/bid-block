import React, { useState, useEffect } from "react";
import { SegmentedControl,Loader } from '@mantine/core';
import axios from "axios";
import Card from "../components/UIElements/Card";
import AuctionList from "../components/AuctionItems/AuctionList";
import LoaderGeneric from "../utils/LoaderGeneric";

function Home(){

    const [AuctionItems, setAuctionItems] = useState([])
    const [auctionStage, setAuctionStage] = useState('live');
    const [loader,isLoader] = useState(true);

    const fetchAuctions = async () => {

        const res = await axios.get(`https://bid-block-server.onrender.com/auctionData/getItems/${auctionStage}?briefs=true`)
        setAuctionItems(res.data)
        isLoader(false);
        console.log(res.data)
    }



    useEffect(() => {
        isLoader(true);
        setAuctionItems([])
        fetchAuctions()
    }, [auctionStage])

    return (
    <>
    <SegmentedControl
      value={auctionStage}
      onChange={setAuctionStage}
      data={[
        { label: 'Past', value: 'past', disabled: loader },
        { label: 'Live', value: 'live', disabled: loader },
        { label: 'Upcoming', value: 'upcoming', disabled: loader },
      ]}
      mb={30}
      radius={16}
      transitionDuration={500}
      transitionTimingFunction="linear"
      size="md"
    />
    {!loader && <AuctionList items={AuctionItems} />}
    {loader && <LoaderGeneric />}
    </>
  );
}

export default Home;