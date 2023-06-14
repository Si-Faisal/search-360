import React from 'react';
import { Helmet } from 'react-helmet-async';
import Carousel from '../Components/Carousel/Carousel';
import BlogCaption from '../Components/BlogCaption/BlogCaption';
import ClassCard from '../Pages/classCard/ClassCard';
import PopularInstractor from '../Pages/PopularInstractor/PopularInstractor';
// import ClassCard from '../Pages/classCard/ClassCard';

const Home = () => {
    return (
        <div>
            
            <Helmet>
                <title>Home|| Search360 </title>
            </Helmet>
            <Carousel></Carousel>
            <BlogCaption h1="POPULAR CLASSES" p="our best instractors class are given here"></BlogCaption>
            <ClassCard></ClassCard>
            <PopularInstractor></PopularInstractor>
        </div>
    );
};

export default Home;