import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
    InputGroup,
    InputLeftElement,
    Input
  } from '@chakra-ui/react';
import { collection, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
  import {BsSearch} from 'react-icons/bs'
import { useHistory } from 'react-router';
import db from '../../Firebase'
  
  export default function Welcome() {
    const history = useHistory()
    const [searchValue, setSearchValue] = useState()

    const [uniList, setUniList] = useState([])

    console.log("uniList",uniList)
    // const getUniversities = () =>
    useEffect(
        () => 
          onSnapshot(collection(db, "universities"), (snapshot) => 
          setUniList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
          ),
        []
    )
    
    const filterProducts = (key, value) => {
      let search = new URLSearchParams(history.location.search)
      search.set(key, value)
      let url = `${history.location.pathname}?${search.toString()}`
      history.push(url)
      setSearchValue(search.get('q'))
      return uniList
    }
    
    let search = new URLSearchParams(history.location.search)
    useEffect(() => {
      setSearchValue(search.get('q') || '')
    }, [history.location])

    return (
      <Flex
        w={'full'}
        h={'100vh'}
        backgroundImage={
          'url(https://st4.depositphotos.com/5493232/21669/i/600/depositphotos_216694098-stock-photo-empty-brown-wooden-table-coffee.jpg)'
          // 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={600}
              lineHeight={2.8}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              Поступай правильно!
            </Text>
            <Text
              color={'white'}
              fontWeight={300}
              lineHeight={1.5}
              fontSize={useBreakpointValue({ base: 'lg', md: '2xl' })}>
              FindU.kg — это самый большой каталог учебных заведений и программ в КР.
              <br/>
              Мы помогаем людям выбирать образование, а учебным заведениям — находить своих студентов.
            </Text>
            <Stack direction={'row'}>
              {/* <Button
                bg={'gray.300'}
                rounded={'full'}
                color={'black'}
                _hover={{ bg: 'blue.500' }}>
                Смотреть ВУЗы
              </Button> */}
              <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<BsSearch color="whiteAlpha.900" />}
                />
                <Input
                    // value=''
                    w ={270}
                    value = {searchValue}
                    onChange = {(e) => filterProducts('q', e.target.value)}
                    // h = {10}
                    fontSize = 'lg'
                    border = 'none'
                    color = "whiteAlpha.800"
                    name = "name"
                    rounded={'full'}
                    placeholder="Поиск по сайту" 
                    bg={'whiteAlpha.400'}
                    _hover={{ bg: 'whiteAlpha.500'}}
                    />
                </InputGroup>

              {/* <Button
                >
                    Поиск
              </Button> */}
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    );
  }