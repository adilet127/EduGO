import { Center } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { clientContext } from '../context/ClientContext';

const Pagination = () => {

    const { postsPerPage, totalPosts, changePage } = useContext(clientContext)
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i)
        console.log("i in pageNumber" ,i);
    }

    console.log("pageNumber" ,pageNumber);
    
    return (
        <Center>
            <ul>
                <div className="style-p">
                    {
                        pageNumber.map(item => (
                            <li onClick={() => {
                                changePage(item)
                                window.scrollTo(0, 0)
                            }} key={item} > {item}</li>
                        ))
                    }
                </div>
            </ul>
        </Center>
    );
};

export default Pagination;