import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    Image,
    Center
} from '@chakra-ui/react';
import { AiOutlineStar} from 'react-icons/ai'

import { collection, doc, onSnapshot } from '@firebase/firestore';
import db from '../Firebase'
import MainCard from './MainCard';
import { useAuth } from '../context/AuthContext';
import { clientContext } from '../context/ClientContext';
import TopCard from './MainCard';
import { useHistory, useParams } from 'react-router';
import { ArrowRightIcon } from '@chakra-ui/icons';

const Details = () => {
    const { id } = useParams();
    const history = useHistory()

    const [uniDetails, setUniDetails] = useState([])
    
    console.log("uniDetails1",uniDetails)
    
    const uImage = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT4t6TL37OJ7LSUpAH55eZDgtZB7PuJgMJMUdyaAEw3tTBvexHF'
    
    useEffect(
        () => 
        onSnapshot(doc(db, "universities", id), (doc) => 
        setUniDetails(doc.data())
        ),
        []
        )
        
    console.log("uniDetails1",uniDetails)

    return (
        <Center mt={20}>
      <Box
        w={{ sm: 605, base: 525, lg: 735}}
        h={{ sm: 620, base: 370, lg: 630}}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'2xl'}
        rounded={'2xl'}
        p={6}
        flexDirection = {'column'}
        >
        <Box
          h={[400, 400, 300]}
          rounded={'2xl'}
          bg={'gray.500'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
        <Text 
            position = {'absolute'}
            p = {1}
            fontSize={'6xl'}
            fontWeight = {600}
            // borderRadius = {'md'}
            top = {4}
            right = {4}
            cursor = "pointer"
            color={'yellow.300'}
            _hover = {{
                color: 'red.400'
            }}
            >
            <AiOutlineStar/>
          </Text>
        <Text 
            position = {'absolute'}
            p = {3}
            fontSize={'md'}
            fontWeight = {400}
            border = {'1px solid #fff'}
            borderRadius = {'md'}
            bottom = {[-5 ,-50,-2]}
            left = {6}
            cursor = "pointer"
            color={'white'}
            bg = {'whiteAlpha.400'}
            _hover = {{
                bg :'whiteAlpha.700',
                color: 'black',
            }}
            >БУДУ ПОСТУПАТЬ
          </Text>
          <Text 
            position = {'absolute'}
            p = {1}
            fontSize={'lg'}
            fontWeight = {400}
            bottom = {-1}
            right = {5}
            color={'white'}
            > {uniDetails.tuitionStart===0 ? 
                ("Бесплатно*"
                ):(
                  `От ${uniDetails.tuitionStart} сом/год`
                  )}
          </Text>
          <Image

            borderTopRadius= {'2xl'}
            boxShadow={'2xl'}
            h = {350}
            w={735}
            
            src={uImage}
            layout={'fill'}
            />
        </Box>
        <Stack>
          <Heading as = "a"
            cursor = "pointer"
            pt ={10}
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'xl'}
            _hover = {{
              color: 'blue.700'
            }}
            href = "/details"
            // fontFamily={'body'}
            >
            {uniDetails.name}
          </Heading>
          <Stack 
                p={5}
                fontWeight={600} >
              <Text>
                <ArrowRightIcon mr={2}/>
                №{uniDetails.rank} в Кыргызстане
              </Text>
              <Text>
                <ArrowRightIcon mr={2}/>
                Общее кол-во факультетов: {uniDetails.totalFaculty}
              </Text>
              <Text>
                <ArrowRightIcon mr={2}/>
                Кол-во бюджетных мест: {uniDetails.grantCount}
              </Text>
              <Text>
                <ArrowRightIcon mr={2}/>
                Средний балл на бюджетное место: {uniDetails.aveForGrant}
              </Text>
              <Text>
                <ArrowRightIcon mr={2}/>
                Статус: {uniDetails.status}
              </Text>
              <Text>
                <ArrowRightIcon mr={2}/>
                Ссылка: {uniDetails.link}
              </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
    );
};

export default Details;