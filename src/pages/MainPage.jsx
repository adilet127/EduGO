import React from 'react';
import Navbar from '../components/Navbar';
import Welcome from '../components/mainContent/Welcome';
import Intro from '../components/mainContent/Intro';
import Ucatalog from '../components/mainContent/Ucatalog';
import Pagination from '../components/Pagination';

const MainPage = () => {
    return (
        <>
            <Navbar/>
            <Welcome/>
            <Intro/>
            <Ucatalog/>
            <Pagination/>
        </>
    );
};

export default MainPage;