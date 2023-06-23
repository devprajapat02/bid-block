import { TextInput, Checkbox, Button, Group, Box,NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const TitleInput = props => {
    return <TextInput
          withAsterisk
          label="Product Name"
          placeholder="eg: Samsung Galaxy S23"
          mt="md"
          size='lg'
          {...props.form.getInputProps('title')}
    />
}

const DescInput = props => {
    return <TextInput
          withAsterisk
          label="Description"
          placeholder="About the product"
          mt="md"
          size='lg'
          {...props.form.getInputProps('desc')}
    />
}

const ImagUrlInput = props => {
    return <TextInput
          withAsterisk
          label="Image Url"
          placeholder="URL"
          mt="md"
          size='lg'
          {...props.form.getInputProps('imageUrl')}
    />
}

const StartingBidInput = props => {
    return <NumberInput
    label="Starting Bid"
    withAsterisk
    mt="md"
    size='lg'
    {...props.form.getInputProps('startingBid')}
  />
}

const formx = props => {
  const form = useForm({
    initialValues: {
      imageUrl:'',
      title:'',
      desc:'',
      startingBid:0,
    },

    validate: {
      
    },
  });

  return (
    <Box maw={1200} mr="auto" sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        textAlign: 'left',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        marginLeft:'0',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })} >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        
        <TitleInput form={form} />
        <DescInput form={form} />
        <StartingBidInput form={form} />
        <ImagUrlInput form={form} />

        <Group position="right" mt="md">
          <Button type="submit" size='lg'>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default formx;
