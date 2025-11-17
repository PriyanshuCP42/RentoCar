import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'


const SignUp = () => {
    const [signupInfo,setSignupInfo]=useState({
        name:'',
        email:'',
        password:''
    })
    const navigate=useNavigate()

    const handleChange = (e) => {
        const {name,value}=e.target
        console.log(name,value)
        const copySignupInfo={...signupInfo}
        copySignupInfo[name]=value
        setSignupInfo(copySignupInfo)
    }
    const handleSignUp=async(e)=>{
        e.preventDefault()          // for stopping to page refresh.
        const {name,email,password}=signupInfo
        if(!name||!email||!password){
            handleError('All fields are required.')
        }
        try{
        const url="https://rentocar.onrender.com/auth/signup"
        const response=await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(signupInfo)
        })
        const data=await response.json()
        const{message,error}=data
        if(message==='SignUp Successfully'){
            handleSuccess("SignUp Successfully")
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }else if(error){
            const errResp=error?.details[0].message
            handleError(errResp)
        }else if (message!="SignUp Successfully"){
            handleError(error)
        }
        console.log(data)
    }catch(err){
        handleError(err)
    }
    }
    return (
        <div className='container'>
            <h1 className='flex items-center justify-center font-bold text-purple-400'>SignUp</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input onChange={handleChange} type='text' name='name' autoFocus placeholder='Enter your name ...' 
                    value={signupInfo.name}/>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' autoFocus placeholder='Enter your email ...' 
                    value={signupInfo.email}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='password' name='password' autoFocus placeholder='Enter your password ...' 
                    value={signupInfo.password}/>
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to='/login'> Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default SignUp
 