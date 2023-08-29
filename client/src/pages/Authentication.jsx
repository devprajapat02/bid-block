import React from 'react';
import { useToggle, upperFirst} from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  LoadingOverlay,
  FileInput,
  Select,
} from '@mantine/core';

import {Country,City, State} from 'country-state-city'
import { GoogleButton,TwitterButton } from "../components/Authentication/SocialButtons";
import { AuthContext } from '../context/AuthContext';
import { useContext,useState,useEffect } from 'react';
import post from '../utils/post';

const Authentication  = props => {
  const Auth = useContext(AuthContext);

  const [type, toggle] = useToggle(['login', 'register']);
  const [visible, setVisible ] = useState(false);


  const [image,setImage] = useState(null);
  const [country,setCountry] = useState([]);
  const [state,setState] = useState([]);
  const [city,setCity] = useState([]);

  useEffect(()=>{
    const data = Country.getAllCountries().map(country => ({
      value: country.name,
      label: `${country.name}`,
      code:country.isoCode
    }))
    setCountry(data);
  },[])

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      pinCode: '',
      address:'',
      country:'',
      state:'',
      city:'',
      image:null,
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      pinCode: (val) => (isNaN(val) ?  "Pincode should be a number." : null),
      country: (val) => (country.find(entity => entity.value === val) !== undefined ? null : "Please choose a valid country"),
      state: (val) => ( ((state.length===0 && val === '') || (val !== '')) ? null : "Please choose a valid State"),
      city: (val) => (((city.length===0 && val=== '' ) || (val !=='')) ? null: "Please choose a valid City"),
    },
  });

  useEffect(()=>{
    const countryCode = country.find(entity => entity.value === form.values.country)
    if(countryCode !== undefined){
    console.log(countryCode['code'])
    let data = State.getStatesOfCountry(countryCode['code']).map(state =>({
      value: state.name,
      label: `${state.name}`,
      code: state.isoCode
    }))
    setState(data);
    form.setValues({state : ''});
    form.setValues({city : ''});
    }
  },[form.values.country])

  useEffect(()=>{
    const stateCode = state.find(entity => entity.value === form.values.state)
    const countryCode = country.find(entity => entity.value === form.values.country)
    if(stateCode !== undefined){
      console.log(stateCode['code'])
      let data = City.getCitiesOfState(countryCode['code'],stateCode['code']).map(city =>({
        value: city.name,
        label: `${city.name}`,
        code: city.isoCode
      }))
      setCity(data);
      form.setValues({city : ''});
      console.log(data)
    }else{
      setCity([]);
    }
  },[form.values.state,form.values.country])

  async function onSubmithandler(props){
    setVisible(true);
    console.log(form.values)
    
    if(type === "login"){

      const res = await post('http://localhost:5000/userData/login', form.values, true, true);
      if (res.status === 200) {
        Auth.login();
      }

    } else if (type === "register"){

      const res = await post('http://localhost:5000/userData/signup', form.values, true, true)
      if (res.status === 200) {
        Auth.login();
      }

    }else{
        console.log("Error : Check Authentication System")
    }
    setVisible(false);
  }

  return (
    <>
        <Paper radius="md" p="xl" withBorder {...props} maw={ type=== 'login'?415:900} mr="auto" ml="auto" my={120} pos="relative" style={type==='register'? {textAlign:"left"}:{}}>
          <LoadingOverlay visible={visible} overlayBlur={2} />
          <Text size="lg" weight={500}>
            Welcome to Bid-Block, {type} with
          </Text>
    
          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <TwitterButton radius="xl">Twitter</TwitterButton>
          </Group>
    
          <Divider label="Or continue with email" labelPosition="center" my="lg" />
    
          <form onSubmit={form.onSubmit((values) => onSubmithandler(values))}>
            <Stack>
              {type === 'register' && (
                <TextInput
                  required
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) => {form.setFieldValue('name', event.currentTarget.value);}}
                  radius="md"
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
                radius="md"
              />

              {type=== 'register' && (
                <Group grow >
                <Select
                  required
                  searchable
                  nothingFound="No options"
                  label="Country"
                  placeholder="Country"
                  data={country}
                  value={form.values.country}
                  onChange={(event)=>{form.setFieldValue('country',event)}}
                  error={form.errors.country && "Please choose a valid country"}
                />

                <Select
                    required
                    nothingFound="No options"
                    label="State"
                    placeholder="Pick one"
                    data={state}
                    value={form.values.state}
                    onChange={(event)=>{form.setFieldValue('state',event)}}
                    error={form.errors.state && "Please choose a valid State"}
                />
                <Select
                    required
                    nothingFound="No options"
                    label="City"
                    placeholder="Pick one"
                    data={city}
                    value={form.values.city}
                    onChange={(event)=>{form.setFieldValue('city',event)}}
                    error={form.errors.city && 'Please choose a valid City'}
                />
                </Group>
              )}

              {type=== 'register' && (
                <TextInput
                required
                type='number'
                label="Pincode"
                placeholder="Your Pincode"
                value={form.values.pinCode}
                onChange={(event) => form.setFieldValue('pinCode', event.currentTarget.value)}
                error={form.errors.pinCode && 'Pincode should be a number.'}
                radius="md"
                />
              )}

              {type=== 'register' && (
                <TextInput 
                required
                label="Address"
                placeholder="Your Address"
                value={form.values.address}
                onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
                radius="md"
                />
              )}

              {type=== 'register' && (
                <FileInput 
                label="Profile Image" 
                placeholder="Your Image"
                value ={image} 
                onChange={(event)=>{
                  setImage(event);
                  const reader = new FileReader();
                  reader.readAsDataURL(event);
                  reader.addEventListener('load', (e) => {
                    let data = e.target.result;
                    form.setFieldValue('image',data);
                  })}}
                accept="image/png,image/jpeg" />
              )}

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
                radius="md"
              />
    
              {type === 'register' && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                />
              )}
            </Stack>
    
            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => {
                  toggle();
                }}
                size="xs"
              >
                {type === 'register'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl" >
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
    </>
  )
}
export default Authentication ;