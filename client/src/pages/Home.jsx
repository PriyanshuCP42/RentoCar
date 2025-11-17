import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
    const navigate=useNavigate()
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);
  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess("User Loggedout")
    setTimeout(()=>{
        navigate('/login')
    },1000)
  }
  return (
    <div>
        <h1 className='font-extrabold text-2xl text-blue-400'>Welcome to RentoCar</h1>
      <h1 className='font-semibold'>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  );
}

export default Home;
