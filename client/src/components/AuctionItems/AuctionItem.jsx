import { Card, Image, Text, Badge, Button, Group,Grid ,rem} from '@mantine/core';

const AuctionItem = props=> {
  const navigateProduct = props => {
    
  }

  return (
    <Grid.Col span={4}>
    <Card shadow="sm" padding="lg" radius="md" withBorder >
      <Card.Section>
        <Image
          src={props.image}
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

      <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={()=>navigateProduct()}>
        Place a Bid
      </Button>
    </Card>
    </Grid.Col>
  );
}

export default AuctionItem; 