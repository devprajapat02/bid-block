import { Card, Image, Text, Badge, Button, Group,Grid ,rem} from '@mantine/core';

const AuctionItem = props=> {
  return (
    <Grid.Col span={4}>
    <Card shadow="sm" padding="lg" radius="md" withBorder >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={180}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{props.title}</Text>
        <Badge color="pink" variant="light">
          {props.startingValue} MATIC
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" lineClamp={1}>
        {props.desc}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Place a Bid
      </Button>
    </Card>
    </Grid.Col>
  );
}

export default AuctionItem; 