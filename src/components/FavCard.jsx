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


export default function FavCard({item}) {
    const [uniCard, setUniCard] = useState()

    useEffect(
      () => 
      onSnapshot(collection(db, "favorites"), (snapshot) => 
      setUniCard(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      []
    )

  return (
    <Stack p={{ sm: 9, base: 5, lg: 6}}>
      favorites: {item}
    </Stack>
  );
}