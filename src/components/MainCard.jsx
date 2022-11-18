// import Image from 'ne.xt/image';
import {
    Box,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    Image,
} from '@chakra-ui/react';
import { collection, onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { AiOutlineStar} from 'react-icons/ai'
// import { handleFavs } from '../../helpers/handles';
import db from '../Firebase'

const uImage = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT4t6TL37OJ7LSUpAH55eZDgtZB7PuJgMJMUdyaAEw3tTBvexHF'


export default function MainCard({uniDetails}) {
    // const [uniCard, setUniCard] = useState()

    // useEffect(
    //   () => 
    //   onSnapshot(collection(db, "universities"), (snapshot) => 
    //   setUniCard(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    //   ),
    //   []
    // )

    console.log(uniDetails);

  return (
    <Stack p={{ sm: 9, base: 5, lg: 6}}
    
    >
      <Box
        w={{ sm: 405, base: 325, lg: 415}}
        h={{ sm: 420, base: 370, lg: 400}}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'2xl'}
        rounded={'2xl'}
        p={6}
        flexDirection = {'column'}
        >
        <Box
          h={'150px'}
          rounded={'2xl'}
          bg={'gray.500'}
          mt={-6}
          mx={-6}
          mb={6}
            //   rounded={'2xl'}
            //   borderTop = {'wxl'}
          pos={'relative'}>
        <Text 
            position = {'absolute'}
            p = {1}
            fontSize={'3xl'}
            fontWeight = {400}
            // border = {'1px solid #fff'}
            borderRadius = {'md'}
            // bottom = {1}
            top = {4}
            right = {4}
            cursor = "pointer"
            color={'yellow.300'}
            // bg = {'whiteAlpha.400'}
            _hover = {{
                // bg :'whiteAlpha.700',
                color: 'red.400'
            }}
            // onClick = {(item) => handleFavs()}
            >
            <AiOutlineStar/>
          </Text>
        <Text 
            position = {'absolute'}
            p = {1}
            fontSize={'sm'}
            fontWeight = {400}
            border = {'1px solid #fff'}
            borderRadius = {'md'}
            bottom = {-2}
            left = {2}
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
            fontSize={'md'}
            fontWeight = {400}
            bottom = {-1}
            right = {3}
            color={'white'}
            > min tuition
          </Text>
          <Image
            className = "uImage"
            borderTopRadius= {'2xl'}
            
            src={uImage}
            layout={'fill'}
            />
        </Box>
        <Stack>
          <Heading as = "a"
            cursor = "pointer"
            pt ={5}
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'lg'}
            _hover = {{
              color: 'blue.700'
            }}
            href = "/details"
            // fontFamily={'body'}
            >
            {/* {uniDetails.name} */}
          </Heading>
        </Stack>
      </Box>
    </Stack>
  );
}