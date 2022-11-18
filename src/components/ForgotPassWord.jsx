import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
import { useState } from 'react';
// import { useHistory } from 'react-router';
import { useAuth } from '../context/AuthContext';

  export default function ForgotPasswordForm(){
    //   const history = useHistory()
      const [email, setEmail] = useState('')
      const { forgotPassword } = useAuth()
      const toast = useToast()

      const handleSubmit = async(e) => {
        e.preventDefault()
        forgotPassword(email)
        .then(response => {
            console.log(response)
            toast({
                description: "Новый пароль отправлен. Проверьте свою почту",
                status: "success",
                duration: "5000",
                isClosable: true
              })
        })
        .catch(e => {
            console.log(e.message)
            toast({
                description: "Ошибка",
                status: "error",
                duration: "5000",
                isClosable: true
              })
        })
      }
    return (
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forgot your password?
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    You&apos;ll get an email with a reset link
                </Text>
                <FormControl id="email">
                    <Input
                    required
                    placeholder="your-email@example.com"
                    _placeholder={{ color: 'gray.500' }}
                    type="email"
                    name = "email"
                    autoComplete = "email"
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                    />
                </FormControl>
                <Flex 
                    align = {'center'}
                    justify = {'space-around'}>
                    <Button
                    as = 'a'
                    href = "/signin"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Back to sing in
                    </Button>
                    <Button
                    type = {'submit'}
                    // as = 'a'
                    // href = "/signin"
                    onClick ={handleSubmit}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Request Reset
                    </Button>
                </Flex>
                </Stack>
            </Flex>
    );
  }