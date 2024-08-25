import React from "react";

import full from "../../assests/images/full.jpg";

import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import {Button, TextField} from "@mui/material"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
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




  //const [error, setError]=useState('');
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);

  if (user || googleuser) {
    navigate('/');
    console.log(user);
    console.log(googleuser);
  }
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    console.log("loading...");
  }

  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    signInWithEmailAndPassword(email, password);
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
      <h2 className="heading4">GLIMPSE</h2>
      <h2 className="heading3">Login</h2>
        <form onSubmit={handleSubmit}>
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
              Login
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
          Don't have an account?
          <Link
            to="/Signup"
            style={{
              color: "black",
              textDecoratiob: "none",
              fontWeight: "600",
              marginLeft: "5px",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
