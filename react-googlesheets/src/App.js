import logo from './logo.svg';
import { Button, Form, Container, Header } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your information are added to spreadsheet!");
    const objt = {name, surname, age, education};

    axios.post('https://sheet.best/api/sheets/fba6d094-04bc-4125-90d5-51c06a74f75a',
    objt).then((response) => {
      console.log(response);

    });
  
  
  };

  
  return (
    <Container fluid className="container">
      <Header as='h2'>React Google Sheets!</Header>
      <Form className='form'>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Surname</label>
          <input placeholder='Enter your surname' onChange={(e) => setSurname(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Age</label>
          <input placeholder='Enter your age' onChange={(e) => setAge(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Education</label>
          <input placeholder='Enter your education level' onChange={(e) => setEducation(e.target.value)}  />
        </Form.Field>

        <Button color="blue" type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
}


export default App;