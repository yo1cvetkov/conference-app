import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import "./register.css"

function Register() {
    const registerUrl = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/register'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if(username.trim('') === '' || password.trim('') === '' || name.trim('') === "" || email.trim('') === ""){
            setMessage("All fields are required");
            return;
        }

        const requestConfig = {
            headers: {
                'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo'
            }
        }

        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }

        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage("Uspesno ste se registrovali!")
        }).catch(error => {
            if(error.response.status === 401) {
                setMessage(error.response.data.message);
            }else{
                setMessage('sorry backend failed')
            }
        }).finally(console.log(event.path))

    }

  return (
    <section className='container'>
        <div className='register__container'>
            <h2 className='title__h2'>Register</h2>
            <p className='font-bold text-xl'>Please enter correct information!</p>
        <form onSubmit={submitHandler} className='reg__form'>
            <div className='input__div'><p>Name:</p><input  type="text" value={name} onChange={event => setName(event.target.value)}/></div>
            <div className='input__div'><p>Email:</p><input type="text" value={email} onChange={event => setEmail(event.target.value)}/></div>
            <div className='input__div'><p>Username:</p><input type="text" value={username} onChange={event => setUsername(event.target.value)}/></div>
            <div className='input__div'><p>Password:</p><input type="password" value={password} onChange={event => setPassword(event.target.value)}/></div>
            <div className='reg__div'><input className='btn btn__input2' type="submit" value="REGISTER" /></div>
        </form>
        <h2 className='title__h2'>{message}</h2>
        </div>
    </section>
  )
}

export default Register