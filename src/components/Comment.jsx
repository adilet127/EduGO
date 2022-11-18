import React, { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, deleteDoc } from '@firebase/firestore';
import db from '../Firebase';

import { Container, Grid, Stack, Center } from '@chakra-ui/layout';
import { Link, Input, InputGroup, InputLeftElement, Button, FormControl,useColorModeValue } from "@chakra-ui/react"
import { GiTrophyCup, GiInfo, GiWhiteTower, GiChecklist, GiCoins } from 'react-icons/gi'
import { FaFileInvoice, FaLink, FaFileContract } from 'react-icons/fa'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Heading} from "@chakra-ui/react"
import { handleCommentClick} from '../helpers/handles';


const Comments = () => {
    const [newComment, setNewComment] = useState({
            name: "",
            commentText: ""
        })
        // fb start
    const [commentsList, setCommentsList] = useState([])

        console.log("commentsList",commentsList)
        useEffect(
            () => 
              onSnapshot(collection(db, "comments"), (snapshot) => 
              setCommentsList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
              ),
            []
        )

        // fb end
    const deleteComment= async(id) => {
        await deleteDoc(doc(db, "comments", id))
        console.log("comment deleted")
    }
    function handleInputs(e){
        let obj = {
            ...newComment,
            [e.target.name]: e.target.value
        }
        setNewComment(obj)
    }
    console.log(newComment);


    return (
        <>
        <Container mt="90px" p={10} rounded = "3xl" boxShadow ="2xl" maxW = "container.sm" bg={useColorModeValue("green.300","cyan.900")}>
            <form action = "submit" 
            // onSubmit = {handleSubmit}
            >
                <Stack spacing={3} color="white">
                    <Heading> Comment Section</Heading>
                    {/* name */}
                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<GiInfo color="grey.500" />}
                            />
                            <Input
                                value={newComment.name}
                                name = "name"
                                placeholder="Enter name" 
                                _placeholder={{ color: 'cyan.100' }}
                                onChange = {handleInputs}
                                />
                        </InputGroup>
                    </FormControl>
                    {/* comment */}
                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaLink color="grey.500" />}
                            />
                            <Input 
                                value={newComment.commentText}
                                name = "commentText"
                                placeholder="Place for your comment"
                                _placeholder={{ color: 'cyan.100' }}
                                onChange = {handleInputs}
                                 />
                        </InputGroup>
                    </FormControl>
                    <Button
                    color = "gray.600"
                    onClick = {(e) => {
                        e.preventDefault()
                        if (
                            !newComment.name.trim() ||
                            !newComment.commentText.trim()
                            ) {
                                alert("Заполните все поля!")
                                return
                            }
                            handleCommentClick(newComment)

                            setNewComment({
                                name: "",
                                commentText: "",
                            })
                    }}
                        > Save 
                    </Button>
                </Stack>
            </form>
            <Center>
                <Table variant="simple" mt={10} w={700} color="white">
                    {/* <TableCaption>2021 updated</TableCaption> */}
                    <Thead>
                        
                        <Tr>
                            <Th isNumeric></Th>
                            <Th>Name</Th>
                            <Th>Comment</Th>
                            {/* <Th></Th> */}
                        </Tr>
                    </Thead>

                    <Tbody>
                        {commentsList.map((row, index) => (
                            <Tr key = {row.id}>
                                <Td isNumeric>{index + 1}</Td>
                                <Td>{row.name}</Td>
                                <Td>{row.commentText}</Td>
                                {/* <Td>
                                    <Button    
                                            onClick = {()=>deleteComment(row.id)}
                                            px={2}
                                            py={1}
                                            rounded={'md'}
                                            bg = "red.300"
                                            _hover={{
                                            textDecoration: 'none',
                                            bg: 'gray.400',
                                            color: "white"
                                            }} 
                                        >DEL
                                    </Button>
                                </Td> */}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Center>
        </Container>
        </>
    );
};

export default Comments;