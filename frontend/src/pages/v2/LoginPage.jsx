import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom'
import axios from "axios";
import APIBASEURL from '../../data/baseURL';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setisError] = useState("");

  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with', { userName, password });
    axios
      .post(
        `${APIBASEURL()}/api/v1/user/login-user`,
        { userName, password },
        { method: "POST" }
      )
      .then((res) => {
        console.log(res)
        if (res.data.message == "login successful") {
          setisError(res.data.message);
        }
        console.log(res.data.token)
        localStorage.setItem('token', res.data.token)
        // navigate('/')
        navigate('/series')
      })
      .catch((error) => {console.log(error, 'hi');
        if (error.response.data.message != "login successful") {
            setisError(error.response.data.message);
          }
      });
  };

   useEffect(() => {
      if(localStorage.getItem('token') == 'undefined'){
        localStorage.removeItem('token')
      }
  else if(localStorage.getItem('token')){
    
    //navigate('/')
    navigate('/series')
  }
    },[])

  return (
    <div style={{ backgroundColor: '#111827', color: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: '#1f2937', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', width: '300px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Login to SeriesX</h2>
        <div style={{ marginBottom: '16px' }}>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', marginTop: '4px' }}
          />
        </div>
        <div>{isError.length > 0 ? <p>{isError}</p> : <p></p>}</div>
        <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '4px' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;