import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';

const PastItem = props => {

  const navigate = useNavigate();

  const Redirect = () => {
    navigate(`/item/${props.auction_id}`);
  }

  return (
    <>
    <Card onClick={Redirect} mr="auto" ml="auto" shadow="sm" className='hover-item' padding="lg" radius="lg" mb={13} withBorder style={{height:166,width:900}}>
      <Group position="apart">
          <Image
            src={props.image}
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
            <Text size="sm" color="dimmed" truncate >
              {props.desc}
            </Text>
          </Stack>
          {props.highest_bid>0 && 
          <Badge color="green" size='lg'>
            Sold : {props.highest_bid}
          </Badge >
          }
          {
            props.highest_bid==0 && 
            <Badge color="red" size='lg'>
              Unsold
            </Badge >
          }

      </Group>
    </Card>
    </>
  );
}

export default PastItem;