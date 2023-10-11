import React from "react";
import { useState } from "react";
import axios from "axios";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Avatar from '@mui/material/Avatar';

export default function LoginForm() {
  const ProjectID = "940da37c-b72d-4246-8cbe-1e1365a73ff0";

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [haserror, sethasError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // var data = {
    //   "username": username,
    //   "secret": password
    // }

    // var config = {
    //   method: 'post',
    //   url: 'https://api.chatengine.io/users',
    //   headers: {
    //     'PRIVATE-KEY': "67b364cf-4b48-4c35-a790-63a05ceb3f7b"
    //   },
    //   data : data
    // };

    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    const authObject = {
      "Project-ID": ProjectID,
      "User-Name": username,
      "User-Secret": password,
    }; //!for authentication
    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
      setError("");
    } catch (err) {
      sethasError(true);
      setError("Oops! Invalid Credentials");
    }
  };

  return (
    <div
      className="wrapper"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1 className="title" style={{ fontFamily: "Custom", color: "white" ,marginBottom: "70px",letterSpacing:"5px"}}>
        Chat Application
      </h1>
      <div className="form" style={{ width: "410px" }}>
      <Avatar  style={{height:"95px",width:"95px",transform:"translateY(-5px)",boxShadow:"6px 0.3rem 1rem rgba(0, 0, 0, 0.211);"}}>
        <Person2RoundedIcon fontSize="large" style={{scale:"1.8"}} />
      </Avatar>
        <h1
          className="title"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "400",
            color: "grey",
            transform:"translateY(5px)"
          }}
        >
          {" "}
          Login
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div style={{ display: "flex",alignItems:"center",justifyContent:"center",transform:"translate(-12px)"}}>
            <Person2RoundedIcon  style={{color: 'rgb(124, 123, 123',transform:"translate(35px,-8px)"}}/>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="input"
              placeholder=" Username..."
              style={{ borderRadius: "10px" }}
              required
            />
          </div>
          <div style={{ display: "flex",alignItems:"center",justifyContent:"center",transform:"translate(-12px)"}}>
            <LockRoundedIcon  style={{color: 'rgb(124, 123, 123',transform:"translate(35px,-8px)"}}/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder=" Password..."
            style={{ borderRadius: "10px" }}
            required
          />
          </div>
          <div align="center">
             <h4 style={{color:"red",marginBottom:"10px"}}>{error}</h4>
            <button className="button">
              <span>Start Chatting</span>
            </button>
          </div>
        </form>
        {/* {haserror && (
          <div className="invalid" style={{ borderRadius: "10px" }}>
          </div>
        )} */}
      </div>
    </div>
  );
}
