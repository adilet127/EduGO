import React, { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, deleteDoc } from '@firebase/firestore';
import db from '../Firebase';

import { Container, Grid, Stack } from '@chakra-ui/layout';
import { Link, Input, InputGroup, InputLeftElement, Button, FormControl,useColorModeValue } from "@chakra-ui/react"
import { GiTrophyCup, GiInfo, GiWhiteTower, GiChecklist, GiCoins } from 'react-icons/gi'
import { FaFileInvoice, FaLink, FaFileContract } from 'react-icons/fa'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption} from "@chakra-ui/react"
import { handleClick} from '../helpers/handles';


const AddUni = () => {
    const [newUni, setNewUni] = useState({
            name: "",
            rank: "",
            status:"",
            totalFaculty: "",
            tuitionStart: "",
            aveForGrant: "",
            grantCount: "",
            link: "",
        })
        // fb start
    const [uniList, setUniList] = useState([])

        console.log("uniList",uniList)
        useEffect(
            () => 
              onSnapshot(collection(db, "universities"), (snapshot) => 
              setUniList(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
              ),
            []
        )

        // fb end
    const deleteUni= async(id) => {
        await deleteDoc(doc(db, "universities", id))
        console.log("deleted")
    }
    function handleInputs(e){
        let obj = {
            ...newUni,
            [e.target.name]: e.target.value
        }
        setNewUni(obj)
    }
    console.log(newUni);


    return (
        <>
        <Container mt="90px" p={8} maxW = "container.sm" bg={useColorModeValue("blue.300","cyan.900")}>
            <form action = "submit" 
            // onSubmit = {handleSubmit}
            >
                <Stack spacing={3} color="white">
                    {/* name */}
                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<GiInfo color="grey.500" />}
                            />
                            <Input
                                value={newUni.name}
                                name = "name"
                                placeholder="University name" 
                                _placeholder={{ color: 'cyan.100' }}
                                onChange = {handleInputs}
                                />
                        </InputGroup>
                    </FormControl>

                    <Grid templateColumns="repeat(3, 1fr)" gap={4} >

                        {/* rank */}
                        <FormControl isRequired>
                          <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<GiTrophyCup color="grey.500" />}
                                />
                                <Input 
                                    w="100%" 
                                    type="number" 
                                    value={newUni.rank}
                                    name = "rank"
                                    placeholder="Rank"
                                    _placeholder={{ color: 'cyan.100' }}
                                    onChange = {handleInputs}
                                    />
                          </InputGroup>
                        </FormControl>

                        {/* total faculties */}
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<GiChecklist color="grey.500" />}
                                />
                                <Input 
                                    w="100%" 
                                    type="number" 
                                    value={newUni.totalFaculty}
                                    name = "totalFaculty"
                                    placeholder="Number of faculties" 
                                    _placeholder={{ color: 'cyan.100' }}
                                    onChange = {handleInputs}
                                    />
                            </InputGroup>
                        </FormControl>

                        {/* tuition fee */}
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<GiCoins color="grey.500" />}
                                />
                                <Input 
                                    w="100%" 
                                    type="number" 
                                    value={newUni.tuitionStart}
                                    name = "tuitionStart"
                                    placeholder="Min tuition fee" 
                                    _placeholder={{ color: 'cyan.100' }}
                                    onChange = {handleInputs}
                                    />
                            </InputGroup>
                        </FormControl>

                        {/* status */}
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<GiWhiteTower color="grey.500" />}
                                />
                                <Input 
                                    value={newUni.status}
                                    name = "status"
                                    placeholder="Status" 
                                    _placeholder={{ color: 'cyan.100' }}
                                    onChange = {handleInputs}
                                    />
                            </InputGroup>
                        </FormControl>

                        {/* grant score */}
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FaFileContract color="grey.500" />}
                                />
                                <Input 
                                    type="number" 
                                    value={newUni.aveForGrant}
                                    name = "aveForGrant"
                                    placeholder="Average score for grant" 
                                    _placeholder={{ color: 'cyan.100' }}
                                    onChange = {handleInputs}
                                    />
                            </InputGroup>
                        </FormControl>

                        {/* total n grants */}
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FaFileInvoice color="grey.500" />}
                                />
                                <Input 
                                    type="number" 
                                    value={newUni.grantCount}
                                    name = "grantCount"
                                    placeholder="Total grants" 
                                    _placeholder={{ color: 'cyan.100' }}
                                    onChange = {handleInputs}
                                    />
                            </InputGroup>
                        </FormControl>
                    </Grid>



                    {/* link */}
                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaLink color="grey.500" />}
                            />
                            <Input 
                                value={newUni.link}
                                name = "link"
                                placeholder="University link"
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
                            !newUni.name.trim() ||
                            !newUni.rank.trim() ||
                            !newUni.totalFaculty.trim() ||
                            !newUni.tuitionStart.trim() ||
                            !newUni.status.trim() ||
                            !newUni.aveForGrant.trim() ||
                            !newUni.grantCount.trim() ||
                            !newUni.link.trim()
                            ) {
                                alert("Заполните все поля!")
                                return
                            }
                            handleClick(newUni)

                            setNewUni({
                                name: "",
                                rank: "",
                                status:"",
                                totalFaculty: "",
                                tuitionStart: "",
                                aveForGrant: "",
                                grantCount: "",
                                link: "",
                            })
                    }}
                        > Save 
                    </Button>
                </Stack>
            </form>
        </Container>
        {/* <Container p={5} maxW = "container.lg" bg="cyan.500"> */}
            <Table variant="striped">
                <TableCaption>2021 updated</TableCaption>
                <Thead>
                    
                    <Tr>
                        <Th isNumeric>№</Th>
                        <Th>University</Th>
                        <Th isNumeric>Rank</Th>
                        <Th isNumeric>Number of faculties</Th>
                        <Th isNumeric>Min tuition fee</Th>
                        <Th>Status</Th>
                        <Th isNumeric>Mean for grant</Th>
                        <Th isNumeric>Total grants</Th>
                        <Th>Link</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {uniList.map((row, index) => (
                        <Tr key = {row.id}>
                            <Td isNumeric>{index + 1}</Td>
                            <Td>{row.name}</Td>
                            <Td>{row.rank}</Td>
                            <Td isNumeric>{row.totalFaculty}</Td>
                            <Td isNumeric>{row.tuitionStart}</Td>
                            <Td>{row.status}</Td>
                            <Td isNumeric>{row.aveForGrant}</Td>
                            <Td isNumeric>{row.grantCount}</Td>
                            <Td>{row.link}</Td>

                            <Td>
                                <Link
                                href={`/edit/${row.id}`}
                                textDecoration = "none"
                                >
                                    <Button 
                                            px={2}
                                            py={1}
                                            rounded={'md'}
                                            bg= "yellow.300"
                                            textDecoration = 'none'
                                            _hover={{
                                            bg: 'green.300',
                                            color: "red"
                                            }} 
                                            // onClick = {() => {handleEdit(row.id)}}
                                        >EDIT
                                    </Button>
                                </Link>
                            </Td>
                            <Td>
                                <Button    
                                        onClick = {()=>deleteUni(row.id)}
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
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        {/* </Container> */}
        </>
    );
};

export default AddUni;