import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
  } from '@chakra-ui/react';
  
  const IMAGE =
    'https://umich.edu/skins/um2013/media/images/U-M-logo-preview.jpg';
  
  export default function UniCard({item}) {
    return (
      //centerize
      <Center p={5}> 
        {/* whole card */}
        <Box
          maxW={'320px'}
          minW={'270px'}
          role={'group'}
          w={[260, 360, 460]}
          h={[460]}
          display = "flex"
          flexDirection = "column"
          justifyContent = 'space-between'
          p={9}
          //   w={'full'}
          bg={useColorModeValue('white', 'gray.600')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-13}
            pos={'relative'}
            height={'180px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${IMAGE})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={200}
              width={280}
              objectFit={'cover'}
              
              src={IMAGE}
            />
          </Box>

          <Stack pt={2} align={'center'}>

            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              University
            </Text>

            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              of Michigan
            </Heading>

            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
                from $45000
              </Text>
            </Stack>

          </Stack>
        </Box>
      </Center>
    );
  }