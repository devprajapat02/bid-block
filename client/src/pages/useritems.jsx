import React from 'react'
import { useState,useEffect } from 'react';
import UserList from '../components/UserItems/UserList'
import post from '../utils/post'

import { SegmentedControl,Loader } from '@mantine/core';

export default function useritems() {

  const [AuctionItems, setAuctionItems] = useState([])
  const [value, setValue] = useState('live');
  const [loader,isLoader] = useState(true);

  const fetchAuctions = async () => {

    const res = await post(`https://bid-block-server.onrender.com/userData/getItems`,{},true,false)
    const items = []
    res.data.auctionList.forEach((item)=>{
      if (value == 'past' && new Date(item.end_time) < new Date() ) {
        items.push(item)
      }
      if (value == 'live' && new Date(item.starting_time) < new Date() && new Date(item.end_time) > new Date()) {
        items.push(item)
      }
      if (value == 'upcoming' && new Date(item.starting_time) > new Date()) {
        items.push(item)
      }
    })
    setAuctionItems(items)
    isLoader(false);
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
        isLoader(true);
        fetchAuctions()
    }, [value])

  return (
    <>
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: 'Past', value: 'past' },
        { label: 'Live', value: 'live' },
        { label: 'Upcoming', value: 'upcoming' },
      ]}
      mb={30}
      radius={16}
      transitionDuration={500}
      transitionTimingFunction="linear"
      disabled={loader}
      size="md"
    />

    {!loader && <UserList items={AuctionItems} type={value}/>}
    {loader && <div className="place-list center" style={{background: "#4d4d4d",marginTop:"40px"}}>
                  <Loader variant="bars" color="white" sz="xl" />
                </div>}
    </>
  );
}
