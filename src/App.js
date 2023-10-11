import logo from './logo.svg';
import './App.css';
import {ChatEngine} from 'react-chat-engine'; 
import React, { Component, useEffect } from 'react';
import ChatFeed from './components/ChatFeed.jsx';
import LoginForm from './components/LoginForm';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { getElementError } from '@testing-library/react';

//npm i @ant-design/icons
//npm i axios
//npm i react-chat-engine
//ChatEngine with its various props

function App() {
  
  useEffect(() => {

    const clearInputByClassName = () => {
      setTimeout(()=>{
        const inputElement = document.querySelector('.ce-text-input');
        // alert(inputElement)
        if (inputElement) {
          inputElement.value = '';
        }
      },10)
    };

    clearInputByClassName();
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  if (!localStorage.getItem("username")) {
    return <LoginForm/> 
  }
  
  return (
    <div className="App">
      <ChatEngine
        height="100vh"
        projectID="940da37c-b72d-4246-8cbe-1e1365a73ff0"
      
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}
        renderChatFeed = { (chatAppProps)=> <ChatFeed {...chatAppProps}/>}
        onNewMessage={()=> new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3')}
      />

    </div>
  );
}

export default App;
