import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useNavigate } from 'react-router-dom'
import APIBASEURL from '../../data/baseURL';

const SignupPage = () => {
  const [name, setName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassowrd, setConfirmPassowrd] = useState('')
  const [matchPassword, setMatchPassword] = useState('')
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setisError] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token') == 'undefined'){
      localStorage.removeItem('token')
    }
else if(localStorage.getItem('token')){
  
  // navigate('/')
  navigate('/series')
}
  },[])

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log('Signing up with', { username, email, password });
    axios
      .post(
        `${APIBASEURL()}/api/v1/user/register-user`,
        { userName, password, name, emailId, phone },
        { method: "POST" }
      )
      .then((res) => {
        console.log(res)
        if (res.data.message == "signup successful") {
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

  return (
    <div style={{ backgroundColor: '#111827', color: 'white', minHeight: '120vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSignup} style={{ backgroundColor: '#1f2937', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', width: '300px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Sign Up for SeriesX</h2>
        <div style={{ marginBottom: '16px' }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', marginTop: '4px' }}
          />
        </div>
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
          <label>Email</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
        <div style={{ marginBottom: '16px' }}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassowrd}
            onChange={(e) => {setConfirmPassowrd(e.target.value); 
              setMatchPassword('Passowrd not matching') 
            if(password == e.target.value){
                console.log(password, e.target.value)
                setMatchPassword('')
            }
            }}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: 'none', marginTop: '4px' }}
          />
        </div>
        <div>
        {/* {confirmPassowrd.length > 0 ? <p>{matchPassword}</p> : <p></p>} */}
        {isError.length > 0 ? <p>{isError}</p> : <p></p>}
        </div>
        <button type="submit" style={{ backgroundColor: '#16a34a', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '4px' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
