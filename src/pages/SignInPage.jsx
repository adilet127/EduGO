import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    useToast
  } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory} from 'react-router';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const { login } = useAuth()

    const mounted = useRef(false)

    useEffect(() => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    }, [])

    const handleSubmit = async(e) => {
      e.preventDefault()
      if (!email || !password){
        toast({
          description: "Заполните все поля",
          status: "error",
          duration: "5000",
          isClosable: true
        })
      }
      setIsSubmitting(true)
      login(email, password)
        .then((response) =>{
          console.log(response)
          history.push("/")
        })
        .catch((error) =>{ 
          console.log(error.message)
          toast({
            description: error.message,
            status: "error",
            duration: "5000",
            isClosable: true
          })
        })
        .finally(()=> mounted.current && setIsSubmitting(false))
    }
    console.log(email, password);

    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Navbar/>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <form
            onSubmit={handleSubmit}>
            <Stack spacing={4} w={'full'} maxW={'md'}>

              <Heading fontSize={'2xl'}>Sign in to your account</Heading>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                  required
                  autoComplete = "email"
                  value = {email}
                  type="email"
                  name="email" 
                  onChange = {(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input 
                  required
                  autoComplete = "password"
                  value = {password}
                  type="password"
                  name="password"
                  onChange = {(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link href="/forgotp" color={'blue.300'}>Forgot password?</Link>
                </Stack>
                  <Link href="/signup" color={'blue.300'}>Don't have an account? Register now</Link>
                <Button
                  isLoading = {isSubmitting}
                  type = "submit"
                  colorScheme={'blue'} 
                  variant={'solid'}>
                  Sign in
                </Button>
              </Stack>

            </Stack>
          </form>
        </Flex>

        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>

      </Stack>
    );
}