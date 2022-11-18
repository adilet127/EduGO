import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  VStack,
  Text,
  useToast
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAIL } from '../helpers/const';
import { useHistory } from 'react-router';

export default function Navbar() {
  const history = useHistory()
  const {currentUser, logout} = useAuth()
  // for burger
  const { isOpen, onOpen, onClose } = useDisclosure();
  // for dark/light mode
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()

  const handleClick = async(e) => {
    e.preventDefault()
    logout()
    toast({
      description: "Сеанс окончен",
      variant: 'subtle',
      status: "info",
      duration: "5000",
      isClosable: true
    })
    history.push('/')
  }
  
  return (
    <>
      {/* main navbar box */}
      <Box className = "navbar" 
      // bg={useColorModeValue('gray.200', 'gray.900')} 
      px={4}>
        {/* just navbar wo burger */}
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* burger and close icon that appears in sm */}
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          {/* nav-left */}
          <HStack spacing={8} alignItems={'center'}>
            {/* logo part */}
            <Box>
              <Link px={2}
                        py={1}
                        rounded={'md'}
                        href="/admin"
                        textDecoration = "none"
                        textDecoration='none'
                        fontSize = {'3xl'}
                        fontWeight = {800}
                        color = "white"
                        // textShadow="1px 2px 2px #000, -1px 0px 2px #000"
                        _hover={{
                          bg: useColorModeValue('gray.500', 'yellow.600'),
                        }} 
              >FindU</Link>
            </Box>
            {/* links to pages */}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
                <Link px={2}
                      py={1}
                      rounded={'md'}
                      href="/"
                      textDecoration='none'
                      fontWeight = {800}
                      // textShadow="1px 1px 1px #fff, -1px 0px 2px #fff"
                      _hover={{
                        bg: useColorModeValue('gray.200', 'gray.700'),
                      }} >About Us Page</Link>
                
                <Link px={2}
                      py={1}
                      rounded={'md'}
                      href="/admin"
                      textDecoration='none'
                      fontWeight = {800}
                      // textShadow="1px 1px 1px #fff, -1px 0px 2px #fff"
                      _hover={{
                        bg: useColorModeValue('gray.200', 'gray.700'),
                      }} >
                        {
                currentUser? 
                  (
                    <>
                    {currentUser.email === ADMIN_EMAIL ? "Add university":null}
                    </>
                  ):(
                  null)
                }
                </Link>
            </HStack>
          </HStack>

          {/* nav-right */}
          <Flex alignItems={'center'}>
            {/* avatar and toggle */}
            <Menu>

              <Button 
                  rounded={'full'}
                  background="gray.700"
                  color ="green.200"
                  m={5}
                  _hover={{
                      background: "green.200",
                      color: "gray.700",
                  }}
                  onClick = {toggleColorMode}
              >{colorMode === "light" ? "Dark" : "Light"}
              </Button>
              <Text px={2}
                      py={1}
                      rounded={'md'}
                      href="/"
                      textDecoration='none'
                      fontWeight = {900}
                      // textShadow="1px 1px 1px #fff, -1px 0px 2px #fff"
                      >
              { currentUser ? 
                  (
                    currentUser.email ?
                          currentUser.email : null

                  ):(
                      null
                  )
              }
              </Text>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                  {currentUser ? (
                    <Avatar
                      size={'sm'}
                      src={
                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      }
                    />

                  ):(
                    <Avatar bg="teal.500" />
                  )
                  }
              </MenuButton>
              <MenuList>
                  {
                    currentUser ? (
                      <>
                        {currentUser.email === ADMIN_EMAIL ? 
                          <>
                            <MenuItem _hover = {{bg: "grey.500"}}>
                                <Link href="/admin">Admin</Link>
                            </MenuItem>
                            <MenuDivider/>
                          </>
                          :null}
                      </>
                    ):(
                      null
                    )
                  }
                  
                  {!currentUser && 
                    <MenuItem _hover = {{bg: "grey.400"}}>
                      <Text as = "a" href="/signup">Регистрация</Text>
                    </MenuItem>
                  }
                  
                  {!currentUser && 
                    <MenuItem  _hover = {{bg: "grey.400"}}>
                      <Text as = "a" href="/signin ">Войти</Text>
                    </MenuItem>
                  }

                  {/* {currentUser && 
                    <MenuItem  _hover = {{bg: "grey.400"}}>
                      <Text as = "a" href="/favs">Избранное</Text>
                    </MenuItem>
                  } */}
                  
                  {currentUser && 
                    <MenuItem onClick = {handleClick} _hover = {{bg: "grey.400"}}>
                      
                      <Text>Выйти</Text>
                    </MenuItem>
                  }
              </MenuList>
              

            </Menu>

          </Flex>

        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <VStack as={'nav'} spacing={4}>
            <Link px={2}
                      py={1}
                      rounded={'md'}
                      href="/admin"
                      textDecoration='none'
                      fontWeight = {800}
                      // textShadow="1px 1px 1px #fff, -1px 0px 2px #fff"
                      >
                        {
                currentUser? 
                  (
                    <>
                    {currentUser.email === ADMIN_EMAIL ? "Add university":null}
                    </>
                  ):(
                  null)
                }
                </Link>
                <Link px={2}
                      py={1}
                      rounded={'md'}
                      textDecoration='none'
                      fontWeight = {800}
                      // textShadow="1px 1px 1px #fff, -1px 0px 2px #fff"
                      _hover = {{
                        bg: "grey.400",
                        // textShadow: useColorModeValue("1px 1px 1px #000, -1px 0px 2px #000", "1px 1px 1px #fff, -1px 0px 2px #fff"),
                       

                      }}
                      href = '/'
                      > About Us Page</Link>
                {/* {currentUser && 
                    <Link href="/favs" _hover = {{bg: "grey.400"}}>
                      Избранное
                    </Link>
                  } */}
            </VStack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}