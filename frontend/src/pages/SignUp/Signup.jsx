import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom'

function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setisError] = useState("");
  const [name, setName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassowrd, setConfirmPassowrd] = useState('')
  const [matchPassword, setMatchPassword] = useState('')

  let navigate = useNavigate();

  useEffect(() => {
if(localStorage.getItem('token') != 'undefined'){
  
  navigate('/players')
}
  },[])

  function RegisterButtonClick() {
    console.log(userName, password, name, emailId, phone, confirmPassowrd);
    axios
      .post(
        "https://fantasy-app-chi.vercel.app/api/v1/user/register-user",
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
        navigate('/')
      })
      .catch((error) => {console.log(error, 'hi');
        if (error.response.data.message != "login successful") {
            setisError(error.response.data.message);
          }
      });
  }

  return (
    <>
      <div>
      <label id="name">Name -: </label> <br />
        <input
          onChange={(e) => {
            setName(e.target.value);
            console.log(e);
          }}
          value={name}
          autoFocus
          placeholder="name"
          name="name"
          type="text"
          defaultValue="a"
        />
        <br />

        <label id="username">UserName -: </label> <br />
        <input
          onChange={(e) => {
            setUserName(e.target.value);
            console.log(e);
          }}
          value={userName}
          autoFocus
          placeholder="username"
          name="userName"
          type="text"
          defaultValue="a"
        />
        <br />
        <label id="emailId">emailId -: </label> <br />
        <input
          onChange={(e) => {
            setEmailId(e.target.value);
            console.log(e);
          }}
          value={emailId}
          autoFocus
          placeholder="emailId"
          name="emailId"
          type="email"
          defaultValue="a"
        />
        <br />
        <label id="phone">phone -: </label> <br />
        <input
          onChange={(e) => {
            setPhone(e.target.value);
            console.log(e);
          }}
          value={phone}
          autoFocus
          placeholder="phone"
          name="phone"
          type="number"
          defaultValue="a"
        />
        <br />
        <label id="passowrd">Password -: </label> <br />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e);
            console.log(password, confirmPassowrd)
          }}
          value={password}
          placeholder="password"
          name="password"
          type="password"
        />
        <br />
        <label id="confirmPassowrd">Confirm Password -: </label> <br />
        <input
          onChange={(e) => {
            setConfirmPassowrd(e.target.value);
            console.log(e);
            console.log(password, confirmPassowrd)
            
            setMatchPassword('Passowrd not matching') 
            if(password == e.target.value){
                console.log(password, e.target.value)
                setMatchPassword('')
            }
            
          }}
          value={confirmPassowrd}
          placeholder="confirmPassowrd"
          name="confirmPassowrd"
          type="password"
        />
        <br />
        {confirmPassowrd.length > 0 ? <p>{matchPassword}</p> : <p></p>}
        <button disabled={matchPassword != "" ? true : false} onClick={RegisterButtonClick}>Register</button>
      </div>
    </>
  );
}

export default Signup;


