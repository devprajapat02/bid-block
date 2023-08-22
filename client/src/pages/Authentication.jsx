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
} from '@mantine/core';

import { GoogleButton,TwitterButton } from "../components/Authentication/SocialButtons";
import { AuthContext } from '../context/AuthContext';
import { useContext,useState } from 'react';
import axios from 'axios';
import post from '../utils/post';

const Authentication  = props => {
  const Auth = useContext(AuthContext);

  const [type, toggle] = useToggle(['login', 'register']);
  const [visible, setVisible ] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  async function onSubmithandler(props){
    setVisible(true);
    console.log(props)
    if(type === "login"){

      const res = await post('http://localhost:5000/userData/login', props, true, true);
      if (res.status === 200) {
        Auth.login();
      }

    } else if (type === "register"){

      const res = await post('http://localhost:5000/userData/signup', props, true, true)
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
        <Paper radius="md" p="xl" withBorder {...props} maw={415} mr="auto" ml="auto" my={120} pos="relative">
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
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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