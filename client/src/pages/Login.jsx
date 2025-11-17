import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'


const Login = () => {
    const [loginInfo,setLoginInfo]=useState({
        email:'',
        password:''
    })
    const navigate=useNavigate()

    const handleChange = (e) => {
        const {name,value}=e.target
        console.log(name,value)
        const copyLoginInfo={...loginInfo}
        copyLoginInfo[name]=value
        setLoginInfo(copyLoginInfo)
    }
    const handleLogin=async(e)=>{
        e.preventDefault()          // for stopping to page refresh.
        const {email,password}=loginInfo
        if(!email||!password){
            handleError('All fields are required.')
        }
        try{
        const url="https://rentocar.onrender.com/auth/login"
        const response=await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginInfo)
        })
        const data=await response.json()
        const{message,jwtToken,name,error}=data
        if (message === "Login Success") {

            handleSuccess(message)
            localStorage.setItem('token',jwtToken)
            localStorage.setItem('loggedInUser',name)
            setTimeout(()=>{
                navigate('/home')
            },1000)
        }else if(error){
            const errResp=error?.details[0].message
            handleError(errResp)
        }else if(message!="Login Success"){
            handleError(message)
        }
        console.log(data)
    }catch(err){
        handleError(err)
    }
    }
    return (
        <div className='container'>
            <h1 className='flex items-center justify-center font-bold text-purple-500'>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' autoFocus placeholder='Enter your email ...' 
                    value={loginInfo.email}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='password' name='password' autoFocus placeholder='Enter your password ...' 
                    value={loginInfo.password}/>
                </div>
                <button type='submit'>Login</button>
                <span>Doesn't have an account?
                    <Link to='/signup'> Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
