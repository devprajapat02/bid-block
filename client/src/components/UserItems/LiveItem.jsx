import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, Stack,Space } from '@mantine/core';
import './hover.css'

const LiveItem = props => {

  const navigate = useNavigate();

  const Redirect = () => {
    navigate(`/item/${props.auction_id}`);
  }

  return (
    <>
    <Card onClick={Redirect} mr="auto" ml="auto" className='hover-item' shadow="sm" padding="lg" radius="lg" mb={13} withBorder style={{height:166,width:900,}} >
      <Group position="apart">
          <Image
            src= {props.image}
            height={160}
            width={160}
            ml={-18}
            mb={-18}
            mt={-18}
            radius="lg"
            alt="Norway"
          />

          <Stack style={{width:400}}>
            <Text weight={500} c="blue" fz="lg">{props.title}</Text>
            <Text size="sm" color="dimmed" truncate>
              {props.desc}
            </Text>
          </Stack>
          
          <Badge color="cyan" size="lg">
            Base Price : {props.startingValue}
          </Badge >
      </Group>
    </Card>
    </>
  );
}
export default LiveItem;