import { InputGroup,
         Stack,
         HStack,
         InputLeftElement,
         Input,
         Center,
         Menu,
        MenuButton,
        MenuList,
        MenuItem,
        Button,
    } from '@chakra-ui/react';
import { collection, doc, getDoc, limit, onSnapshot, orderBy, query } from '@firebase/firestore';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { clientContext } from '../../context/ClientContext';
import db from '../../Firebase'
import InfoCard from './InfoCard';
import {BsSearch} from 'react-icons/bs'
import { useHistory } from 'react-router';
import { ChevronDownIcon } from '@chakra-ui/icons';


const Ucatalog = () => {
    const [price, setPrice] = useState('');

    const [uniPreview, setUniPreview] = useState([])
    const {currentPosts} = useContext(clientContext)
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const history = useHistory()
    const [searchValue, setSearchValue] = useState('')
    const uniRef = collection(db, 'universities')

    useEffect(
        () => 
          onSnapshot(collection(db, "universities"), (snapshot) => 
          setUniPreview(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
          ),
        []
    )

    useEffect(() => {
        return () => {
          isMounted.current = false
        }
      }, [])

    const sendRequest = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
        // update state
        setIsSending(true)
        // send the actual request
        onSnapshot(query(uniRef, orderBy("aveForGrant",  "desc")), (snapshot) => 
        setPrice(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id, price: doc.aveForGrant})))
        )
        console.log("changes");
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
          setIsSending(false)
      }, [isSending])

    
    const filterProducts = (key, value) => {
      let search = new URLSearchParams(history.location.search)
      search.set(key, value)
    //   console.log(search);
      let url = `${history.location.pathname}?${search.toString()}`
      history.push(url)
      setSearchValue(search.get('s'))
    //   setUniPreview()
    }
    
    let search = new URLSearchParams(history.location.search)
    // console.log(search);
    useEffect(() => {
      setSearchValue(search.get('s') || '')
    }, [history.location])




    return (
        <div className = "container">
            <HStack w= {600} m={'auto'}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<BsSearch color="whiteAlpha.900" />}
                    />
                    <Input
                        // value=''
                        w ={370}
                        h ={45}
                        value = {searchValue}
                        onChange = {(e) => filterProducts('s', e.target.value)}
                        // h = {10}
                        fontSize = 'lg'
                        border = 'none'
                        color = "whiteAlpha.900"
                        name = "name"
                        rounded={'full'}
                        placeholder="Поиск" 
                        _placeholder={{color: 'whiteAlpha.700'}}
                        bg={'blackAlpha.300'}
                        _hover={{ bg: 'blackAlpha.500'}}
                        />
                </InputGroup>
                <Stack>
                    <Menu ml={7}>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Фильтрация по цене
                        </MenuButton>
                        <MenuList 
                            value={price}
                            // onChange={}
                            >
                            <MenuItem value="20000">До 20000</MenuItem>
                            <MenuItem value="30000">До 30000</MenuItem>
                            <MenuItem value="50000">До 50000</MenuItem>
                            <MenuItem value="100000">До 100000</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                            Сортировка по 
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={sendRequest}>Проходному баллу на бюждет</MenuItem>
                            <MenuItem>Возрастанию контракта</MenuItem>
                            <MenuItem>Убыванию контракта</MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            </HStack>
            <Stack justifyContent = "space-evenly" flexDirection = {'row'} flexWrap = {"wrap"} >
                {
                    uniPreview ? 
                        (currentPosts.map((item,index) => (
                                <Stack >
                                    <InfoCard item = {item} key = {index}/>
                                </Stack>
                            ))
                        )
                    :(
                        <h2>Loading...</h2>
                    )
                }
            </Stack >
        </div>
    );
};

export default Ucatalog;