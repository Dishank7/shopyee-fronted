import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

   const [state,setState] = useState("Login");
   const [formData , setFormData] = useState({
    username:"",
    password:"",
    email:""
   })

   const changeHandler = (e) =>{
     setFormData({...formData,[e.target.name]:e.target.value})
   }

   const login = async ()=>{
   console.log("Login...", formData)
   let responseData;
   await fetch('http://localhost:4000/login', {
    method:"POST",
    headers:{
      Accept:'application/form-data',
      "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
   }).then((resp)=> resp.json())
   .then((data)=> responseData = data);

   if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace('/');
   }
   else{
    alert(responseData.error);
   }

   }

   const signUp = async ()=>{
   console.log("Signup...",formData)
   let responseData;
   await fetch('http://localhost:4000/signup', {
    method:"POST",
    headers:{
      Accept:'application/form-data',
      "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
   }).then((resp)=> resp.json())
   .then((data)=> responseData = data);

   if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace('/');
   }
   else{
    alert(responseData.error);
   }
   }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? 
          <input 
          type="text" 
          placeholder='Your Name' 
          name="username" 
          value={formData.username}
          onChange={changeHandler}
          id="" />:<></> }
          
          <input 
          type="email" 
          placeholder='Email Address' 
          name="email"
          value={formData.email}
          onChange={changeHandler} 
          id="" />
          <input 
          type="password" 
          placeholder='Password' 
          name="password"
          value={formData.password}
          onChange={changeHandler} 
          id="" />
          <button 
          onClick={()=>{state === "Login"? login():signUp()}}>Continue</button>
          {state === "Sign Up"?  
          <p className="loginsignup-login">Already have an Accout? <span onClick={()=>setState("Login")}>Login Here</span></p>:
          <p className="loginsignup-login">Create an Account? <span onClick={()=>setState("Sign Up")}>Click Here</span></p>}
        </div>
        <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, i agree to the terms of use & privacy policy. </p>
          </div>
      </div>
    </div>
  )
}

export default LoginSignup
