// import { Box, Image, Text, Link } from '@chakra-ui/react';
import React from 'react';
import AddUni from '../components/AddUni';
import Navbar from '../components/Navbar';
import UniversityTable from '../components/UniversityTable';

const AdminPage = () => {
    console.log("Admin");
    return (
        <div>
            <Navbar/>
            <AddUni/>
            {/* <UniversityTable/> */}
        </div>
    );
};

export default AdminPage;