import React from 'react';
import { Container,Table, Thead, Tbody, Tr, Th, TableCaption} from "@chakra-ui/react"


const UniversityTable = () => {
    return (
            <Container p={5} maxW = "container.lg" bg="cyan.500">
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
                    </Tr>
                </Thead>

                <Tbody>
                    {/* {uInfo.map((row, index) => (
                        <Tr key = {index}>
                            <Td isNumeric>{index + 1}</Td>
                            <Td>{row.name}</Td>
                            <Td>{row.rank}</Td>
                            <Td isNumeric>{row.totalFaculty}</Td>
                            <Td isNumeric>{row.tuitionStart}</Td>
                            <Td>{row.status}</Td>
                            <Td isNumeric>{row.aveForGrant}</Td>
                            <Td isNumeric>{row.grantCount}</Td>
                            <Td>{row.link}</Td>
                        </Tr>
                    ))} */}
                </Tbody>
            </Table>
       </Container>
    );
};

export default UniversityTable;