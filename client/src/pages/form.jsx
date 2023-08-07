import React, { useState } from 'react';
import { TextInput, Checkbox, Button, Group, Box,NumberInput } from '@mantine/core';
import { DateInput, TimeInput, DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { ethers } from 'ethers';

const TitleInput = props => {
    return <TextInput
          withAsterisk
          label="Product Name"
          placeholder="eg: Samsung Galaxy S23"
          mt="md"
          size='lg'
          {...props.form.getInputProps('product_name')}
    />
}

const DescInput = props => {
    return <TextInput
          withAsterisk
          label="Description"
          placeholder="About the product"
          mt="md"
          size='lg'
          {...props.form.getInputProps('description')}
    />
}

const ImagUrlInput = props => {
    return <TextInput
          withAsterisk
          label="Image Url"
          placeholder="URL"
          mt="md"
          size='lg'
          {...props.form.getInputProps('images')}
    />
}

const StartingBidInput = props => {
    return <NumberInput
    label="Base Price"
    withAsterisk
    mt="md"
    size='lg'
    {...props.form.getInputProps('base_price')}
  />
}

const StartingTime = props => {

  const [date, setDate] = useState(null);

  return <DateTimePicker
    label="Starting Time"
    minDate={new Date()}
    placeholder={new Date().toUTCString()}
    withAsterisk
    mt="md"
    size='lg'
    value={date}
    onChange={(value) => {setDate(value); props.form.setFieldValue('starting_time', value.toString());}}
  />
}

const EndingTime = props => {

  const [date, setDate] = useState(null);

  return <DateTimePicker
    label="Ending Time"
    minDate={new Date()}
    placeholder={new Date().toUTCString()}
    withAsterisk
    mt="md"
    size='lg'
    value={date}
    onChange={(value) => {setDate(value); props.form.setFieldValue('ending_time', value.toString());}}
  />
}

const formx = props => {
  const form = useForm({
    initialValues: {
      images:'',
      product_name:'',
      description:'',
      base_price:0,
      starting_time: null,
      ending_time: null,
    },

    validate: {
      
    },
  });

  const handleSubmit = async (values) => {
    try {
      let params = values
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      params.address = accounts[0];
      const res = await axios.post('http://localhost:5000/createAuction', params, {withCredentials: true});
      console.log(res.data)
      const signer = provider.getSigner(params.address);
      const tx = await signer.sendTransaction(res.data.tx)
      await tx.wait()
      console.log(tx)
      params.tx = tx.hash
      params.auction_id = res.data.auction_id 

      const res2 = await axios.post('http://localhost:5000/createAuction/mongo', params, {withCredentials: true})
      console.log(res2.data);
    } catch (error) {
      console.log(error);
    }
  }

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
      <form onSubmit={form.onSubmit(async (values) => handleSubmit(values))}>
        
        <TitleInput form={form} />
        <DescInput form={form} />
        <StartingBidInput form={form} />
        <ImagUrlInput form={form} />
        <StartingTime form={form} />
        <EndingTime form={form} />

        <Group position="right" mt="md">
          <Button type="submit" size='lg'>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default formx;
