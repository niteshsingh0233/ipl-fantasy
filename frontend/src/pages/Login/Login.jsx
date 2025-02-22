import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom'

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setisError] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token') == 'undefined'){
      localStorage.removeItem('token')
    }
else if(localStorage.getItem('token')){
  
  navigate('/')
}
  },[])

  

  function LoginButtonClick() {
    console.log(userName, password);
    axios
      .post(
        "https://fantasy-app-chi.vercel.app/api/v1/user/login-user",
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
      <div className="login-class">
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
        <label id="passowrd">Password -: </label> <br />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e);
          }}
          value={password}
          placeholder="password"
          name="password"
          type="password"
        />
        <br />
        {isError.length > 0 ? <p>{isError}</p> : <p>hi</p>}
        <button onClick={LoginButtonClick}>Login</button>
      </div>
    </>
  );
}

export default Login;
