import { InputGroup,
         Stack,
         HStack,
         InputLeftElement,
         Input,
         Menu,
        MenuButton,
        MenuList,
        MenuItem,
        Button,
    } from '@chakra-ui/react';
import { collection, getDocs, onSnapshot, query, where, } from '@firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { clientContext } from '../context/ClientContext';
import db from '../Firebase'
// import InfoCard from './InfoCard';
import FavCard from './FavCard';
import {BsSearch} from 'react-icons/bs'
import { useHistory } from 'react-router';
import { ChevronDownIcon } from '@chakra-ui/icons';


const Ucatalog = () => {
    const [uniPreview, setUniPreview] = useState([])
    const {currentPosts} = useContext(clientContext)

    const [searchValue, setSearchValue] = useState('')
    useEffect(
        () => 
          onSnapshot(collection(db, "universities"), (snapshot) => 
          setUniPreview(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
          ),
        []
    )

    // const uniRef = collection(db, "universities");
    // const q = query(uniRef, where("status", "==", "Privat"));
    // getDocs(q).then(querySnapshot =>
    //     querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // setUniPreview({...doc.data(), id: doc.id})
    //     console.log({...doc.data(), id: doc.id})
    // })
    // )

    const uniRef = collection(db, "universities");
    
        const q = query(uniRef, where("tuitionStart", "<", 20000));
        const filtered = getDocs(q).then(querySnapshot =>
            querySnapshot.forEach(doc => 
            console.log({...doc.data(), id: doc.id})
        )
        )

        console.log(filtered);


    return (
        <div className = "container">
            <HStack w= {600} m={'auto'} pt={20}>
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
                        // onChange = {(e) => filterProducts('s', e.target.value)}
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
                        <MenuList>
                            <MenuItem>До 20000</MenuItem>
                            <MenuItem>До 30000</MenuItem>
                            <MenuItem>До 50000</MenuItem>
                            <MenuItem>До 100000</MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                            Сортировка по 
                        </MenuButton>
                        <MenuList>
                            <MenuItem 
                            // onClick={sendRequest}
                                >Проходному баллу на бюждет</MenuItem>
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
                                    <FavCard item = {item} key = {index}/>
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