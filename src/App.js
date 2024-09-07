import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import {Client} from './requests/Client.tsx';
import './App.css';

function App() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    secret: process.env.SECRET
  } );

  const onChange = (e) => {
    var type = e.target.type;
    switch (type) {
      case 'username':
        setCredentials({...credentials, username: e.target.value});
        break;
      case 'password':
        setCredentials({...credentials, password: e.target.value});
        break;
      default:
        throw new Error('Invalid input type');
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    Client.login(credentials)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
      <header className="App-page">
        <InputGroup>
          <Form.Control
            placeholder="username"
            aria-label="username"
            aria-describedby="basic-addon1"
            onChange={onChange}
          />
        </InputGroup>
        <InputGroup>
          <Form.Control
            placeholder="password"
            aria-label="password"
            aria-describedby="basic-addon1"
            onChange={onChange}
          />
        </InputGroup>
        <Button variant="primary" onClick={onSubmit} >Login</Button>{' '}
      </header>
    </>
  );
}

export default App;
