import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from "../firebase.init";
import PageLoading from './PageLoading';
const ProtectedRoute = ({children}) => {
    const[user, isloading]=useAuthState(auth);
    if(isloading){
        return <PageLoading/>
    }
    if(!user){
        return <Navigate to="./login"/>
    }
    return children;
}

export default ProtectedRoute