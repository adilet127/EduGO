import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
  
const useQuery = () => {
  const location = useLocation()
  return new URLSearchParams(location.search)
}
  export default function ResetPasswordForm(){
    const history = useHistory()
    const  { resetPassword } = useAuth()
    const [newPassword, setNewPassword] = useState('')
    const toast = useToast()
    const query = useQuery()

    const handleSubmit = async(e) => {
      e.preventDefault()
      resetPassword(query.get('oobCode'), newPassword)
      .then(response => {
        console.log(response)
        toast({
          description: "Пароль изменён",
          status: "success",
          duration: "5000",
          isClosable: true
        })
        history.push("/signin")
      })
      .catch(e => {
        console.log(e.message)
        toast({
          description: "Возникла ошибка",
          status: "error",
          duration: "5000",
          isClosable: true
        });
      })
      history.push("/signin")
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
            Введите новый пароль
          </Heading>
          <FormControl id="password" isRequired>
            <FormLabel>Новый пароль</FormLabel>
            <Input 
                type="password"
                value = {newPassword}
                onChange = {e => setNewPassword(e.target.value)}
                />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick ={handleSubmit}>
              Изменить
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }