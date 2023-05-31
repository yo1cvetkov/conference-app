import React from 'react'
import { useState } from 'react'
import axios from 'axios'

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
            alert("uspesno ste se registrovali!")
        }).catch(error => {
            if(error.response.status === 401) {
                setMessage(error.response.data.message);
            }else{
                setMessage('sorry backend failed')
            }
        })

    }

  return (
    <section className='container'>
        <form onSubmit={submitHandler}>
            name: <input type="text" value={name} onChange={event => setName(event.target.value)}/> <br />
            email: <input type="text" value={email} onChange={event => setEmail(event.target.value)}/> <br />
            username: <input type="text" value={username} onChange={event => setUsername(event.target.value)}/> <br />
            password: <input type="text" value={password} onChange={event => setPassword(event.target.value)}/> <br />
            <input type="submit" name="REGISTER" />
        </form>
        {message}
    </section>
  )
}

export default Register