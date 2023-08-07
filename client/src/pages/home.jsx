import React, { useState, useEffect } from "react";
import { SegmentedControl } from '@mantine/core';
import axios from "axios";
import AuctionList from "../components/AuctionItems/AuctionList";

function Home(){

    const [AuctionItems, setAuctionItems] = useState([])
    const [value, setValue] = useState('ongoing');

    const fetchAuctions = async () => {
        const res = await axios.get("http://localhost:5000/auctionData/getItems/upcoming?briefs=true")
        setAuctionItems(res.data)
        console.log(res.data)
    }

    const Auctionitems =[
        {id: 'u1', title :'Iphone 14',image:"https://images.hindustantimes.com/auto/img/2022/05/31/1600x900/Land_Rover_Defender_130___3_1653991863473_1653992022869.jpg",desc:"The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max.",creatorId:"u1",startingValue:1000},
        {id: 'u2', title :'Iphone 14',image:"https://images.hindustantimes.com/auto/img/2022/05/31/1600x900/Land_Rover_Defender_130___3_1653991863473_1653992022869.jpg",desc:"The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max.",creatorId:"u1",startingValue:1000},
        {id: 'u3', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
        {id: 'u4', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
        {id: 'u5', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
        {id: 'u6', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
        {id: 'u7', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
        {id: 'u8', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
        {id: 'u9', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
        {id: 'u10', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
        {id: 'u11', title :'car',image:"https://images.boats.com/resize/wp/2/files/2022/12/2023-Pearl-72-Yacht.jpeg",desc:"gguyguy",creatorId:"u2",startingValue:6500},
            ]

    useEffect(() => {
        fetchAuctions()
    }, [value])
  
    return (
    <>
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Past', value: 'past' },
        { label: 'Upcoming', value: 'upcoming' },
      ]}
      mb={30}
      radius={16}
      transitionDuration={500}
      transitionTimingFunction="linear"
      size="md"
    />
    <AuctionList items={AuctionItems} />
    </>
  );
}

export default Home;