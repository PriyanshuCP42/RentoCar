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
  // const [loggedInUser, setLoggedInUser] = useState('');
  //   const navigate=useNavigate()
  // useEffect(() => {
  //   setLoggedInUser(localStorage.getItem('loggedInUser'));
  // }, []);
  // const handleLogout=()=>{
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('loggedInUser')
  //   handleSuccess("User Loggedout")
  //   setTimeout(()=>{
  //       navigate('/login')
  //   },1000)
  // }
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
