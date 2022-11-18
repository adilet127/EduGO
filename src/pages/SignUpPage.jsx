import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../context/AuthContext';

  
  export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const { register } = useAuth()

    const mounted = useRef(false)

    useEffect(() => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    }, [])
    
    const history = useHistory()

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
      register(email, password)
        .then((response) =>{
          console.log(response)
          history.push('/')
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
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign up</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
          w={[300, 400, 500]}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <form 
              onSubmit = {handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                  required
                  type="email"
                  name = "email"
                  autoComplete = "email"
                  value = {email}
                  onChange = {(e) => setEmail(e.target.value)}
                 />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input 
                  required
                  type="password" 
                  name = "password"
                  autoComplete = "password"
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  {/* <Checkbox>Remember me</Checkbox> */}
                  <Link href="/signin" color={'blue.400'}>Already have an account? Sign in</Link>
                </Stack>
                <Button
                  type = "submit"
                  isLoading = {isSubmitting}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }