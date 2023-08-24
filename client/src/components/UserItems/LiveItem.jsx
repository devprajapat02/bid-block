import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, Stack,Space } from '@mantine/core';
import './hover.css'

export default function LiveItem() {

  const navigate = useNavigate();

  const Redirect = props => {
    navigate("/");
  }

  return (
    <>
    <Card onClick={Redirect} mr="auto" ml="auto" className='hover-item' shadow="sm" padding="lg" radius="lg" mb={13} withBorder style={{height:166,width:900,}} >
      <Group position="apart">
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={160}
            width={160}
            ml={-18}
            mb={-18}
            mt={-18}
            radius="lg"
            alt="Norway"
          />

          <Stack style={{width:400}}>
            <Text weight={500} c="blue" fz="lg">Norway Fjord Adventures</Text>
            <Text size="sm" color="dimmed" truncate>
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </Text>
          </Stack>
          
          <Badge color="cyan" size="lg">
            Base Price : 500
          </Badge >
      </Group>
    </Card>
    </>
  );
}
