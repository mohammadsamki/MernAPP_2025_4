import { useState } from 'react'
import React from 'react'
import { useAuth } from "../context/AuthContext";
const Login = () => {
    const {login }= useAuth()
    const [form,setForm]= useState({
        email:'',
        password:''
    })
    const [error,setError]= useState('')
    const onSubmit = async (e)=>{
        e.preventDefault();
        setError('')
        try {
            const data = await login(form.email, form.password);
            window.location.href = '/home';
            
        } catch (error) {
            setError(error.message)
            
        }
    }
   
  return (
    <div className="container mt-5">
      <form onSubmit={onSubmit} id="loginForm">
        <div className="form-outline mb-4">
          <input onChange={(e)=>setForm({...form,email:e.target.value})} type="email" id="form2Example1" className="form-control" placeholder="Email address" />
        </div>
        <div className="form-outline mb-4">
          <input onChange={(e)=>setForm({...form,password:e.target.value})} type="password" id="form2Example2" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
      </form>
    </div>
  )
}

export default Login