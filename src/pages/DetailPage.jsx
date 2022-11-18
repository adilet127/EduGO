import React from 'react';
import Comments from '../components/Comment';
import Details from '../components/Details';
import Navbar from '../components/Navbar';

const DetailPage = () => {
    return (
        <div>
            <Navbar/>
            <Details/>
            <Comments/>
        </div>
    );
};

export default DetailPage;