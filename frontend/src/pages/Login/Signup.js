import React from "react";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  
  
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

import full from "../../assests/images/full.jpg";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {  RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import axios from "axios";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import {Button, TextField} from "@mui/material"


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [usern, setUsern] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  
  const sendOtp= async()=>{
    try{
      const recaptcha= new RecaptchaVerifier(auth,"recaptcha",{})
      const confirmation=  await signInWithPhoneNumber(auth, phone, recaptcha)
      setUsern(confirmation)
    }catch(err){
      console.error(err)
    }
    
  }

  const verifyOtp = async()=>{
    try{
      const data=await usern.confirm(otp)
      console.log(data);
      axios.post(`http://localhost:5000/register`, data)
      if (data) {
      navigate("/")
      }
    }catch(err){
      console.error(err)
    }
    
  }


  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);
  

  if (user || googleuser) {
    navigate("/");
    console.log(user);
    console.log(googleuser);
  }
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    console.log("loading...");
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(email, password);
    const user = {
      username: username,
      name: name,
      email: email,
    };
   axios.post(`http://localhost:5000/register`, user)


  
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle();
    signInWithPhoneNumber();
  };

  return (
    <div className="login-container">
      {/* <div className="img-container"> */}
        <img src={full} alt="" />
      {/* </div> */}
      <div className="form-container">
        <h1 className="heading">Happening Now!</h1>
        <div class="d-flex align-items-sm-center">
          <h3 className="heading1"> Join Glimpse Today</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            className="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn-login">
            <button type="submit" className="btn">
              SignUp
            </button>
          </div>
        </form>
        <hr />
        <div className="google-button">
          <GoogleButton
            className="g-btn"
            type="light"
            onClick={handleGoogleSignIn}
          />
        </div>
        
        <div className="phone-button">
          <div className='phone-content'>
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={(phone)=>setPhone("+" +phone)}
          />
          <Button variant='contained' sx={{marginTop:"10px"}} onClick={sendOtp}>Send OTP</Button>
          <div style={{marginTop:"10px"}} id="recaptcha"></div>
          <br/>
          <TextField onChange={(e)=>setOtp(e.target.value)} variant='outlined' sx={{marginTop:"10px", width:"300px", marginRight:"10px"}} size='small' label='Enter OTP'></TextField>
          <br/>
          <Button onClick={verifyOtp} variant='contained'  sx={{marginTop:"10px"}} color='success'>Verify OTP</Button>
          </div>
        </div>   
        <div className="hard">
          Already have an account?
          <Link
            to="/login"
            style={{
              color: "black",
              textDecoratiob: "none",
              fontWeight: "600",
              marginLeft: "5px",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
