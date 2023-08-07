import React from 'react'

import { Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';

export default function PastItem() {

  return (
    <>
    <Card mr="auto" ml="auto" shadow="sm" padding="lg" radius="lg" mb={13} withBorder >
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

          <Stack>
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Text size="sm" color="dimmed" lineClamp={1}>
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </Text>
          </Stack>
          
          <Badge color="green" size='xl'>
            Base Price : 500
          </Badge >

      </Group>
    </Card>
    </>
  );
}
