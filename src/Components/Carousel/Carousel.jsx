import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

import img1 from '../../assets/carusol/carusol1.jpg'
import img2 from '../../assets/carusol/carusol2.jpg'
import img3 from '../../assets/carusol/carusol3.jpg'
import img4 from '../../assets/carusol/carusel4.jpg'
import img5 from '../../assets/carusol/carosol5.jpg'
import img6 from '../../assets/carusol/carusol6.jpg'

const Carousel = () => {
    return (
        <Swiper
            pagination={{
                type: "fraction",
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay ,Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                
                <div className=" relative w-full mt-8">
                    <img className="w-full h-[300px] lg:h-[500px]" src={img5} alt="" />
                    <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#3f3838] to-[rgba(21, 21, 21, 0)] text-white">
                        <p className="text-xl md:text-2xl lg:text-4xl text-orange-200 uppercase font-bold ms-20 lg:leading-[60px]  w-2/4 flex justify-center items-center gap-10">learn more about press conferences, and how to host them successfully</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=" relative w-full mt-8">
                    <img className="w-full h-[300px] lg:h-[500px]" src={img4} alt="" />
                    <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#3f3838] to-[rgba(21, 21, 21, 0)] text-white">
                        <p className="text-xl md:text-2xl lg:text-4xl text-orange-200 uppercase font-bold ms-20 lg:leading-[60px]  w-2/4 flex justify-center items-center gap-10">learn how to build good relationships in the media and create top-notch messages and brilliant soundbites for media interviews</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=" relative w-full mt-8">
                    <img className="w-full h-[300px] lg:h-[500px]" src={img3} alt="" />
                    <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#3f3838] to-[rgba(21, 21, 21, 0)] text-white">
                        <p className="text-xl md:text-2xl lg:text-4xl text-orange-200 uppercase font-bold ms-20 lg:leading-[60px]  w-2/4 flex justify-center items-center gap-10">Learn how to give media interviews to convey your message effectively to your audience </p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=" relative w-full mt-8">
                    <img className="w-full h-[300px] lg:h-[500px]" src={img2} alt="" />
                    <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#3f3838] to-[rgba(21, 21, 21, 0)] text-white">
                        <p className="text-xl md:text-2xl lg:text-4xl text-orange-200 uppercase font-bold ms-20 lg:leading-[60px]  w-2/4 flex justify-center items-center gap-10">Learn the advanced techniques to improve your media expertise with the best practices taught </p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=" relative w-full mt-8">
                    <img className="w-full h-[300px] lg:h-[500px]" src={img1} alt="" />
                    <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#3f3838] to-[rgba(21, 21, 21, 0)] text-white">
                        <p className="text-xl md:text-2xl lg:text-4xl text-orange-200 uppercase font-bold ms-20 lg:leading-[60px]  w-2/4 flex justify-center items-center gap-10">Media interviews are both challenging and helpful for your personal goals and professional growth</p>
                    </div>
                </div>
            </SwiperSlide>
            {/* <SwiperSlide>
                <div className=" relative w-full mt-8">
                    <img className="w-full h-[500px]" src={img1} alt="" />
                    <div className="absolute rounded-xl flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#3f3838] to-[rgba(21, 21, 21, 0)] text-white">
                        <p className="text-4xl text-orange-200 uppercase font-bold ms-20 leading-[60px] w-1/4 flex justify-center items-center gap-10">Learn how to give media interviews to convey your message effectively to your audience </p>
                    </div>
                </div>
            </SwiperSlide> */}
            
        </Swiper>
    );
};

export default Carousel;