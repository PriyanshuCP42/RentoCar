import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import Banner from '../components/Banner';
import Testimonial from '../components/Testimonial';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
function Home() {

  return (
    <>
    <Hero/>
    <FeaturedSection/>
    <Banner/>
    <Testimonial/>
    <NewsLetter/>
    </>
  );
}

export default Home;
