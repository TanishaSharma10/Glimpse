import React from 'react'
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar'
import Widgets from './Widgets/Widgets'
import {useAuthState} from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import {signOut} from 'firebase/auth';
import { useNavigate } from "react-router";


const Home = () => {


  const user=useAuthState(auth);
  //console.log(user[0]?.email);
  const navigate = useNavigate();
  const handleLogout=()=>{
    signOut(auth);
    navigate("/login");
  }
  return (
    <div className='app'>
      <Sidebar handleLogout={handleLogout} user={user}/>
      <Outlet/>
      <Widgets/>
      
    </div>
  )
}

export default Home
