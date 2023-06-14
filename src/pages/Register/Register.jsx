import "./register.css"
import React, { useContext } from 'react'
import { useState } from 'react'
import { LoggedContext } from '../../AuthContext';
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../DataContext";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [deployment, setDeployment] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState(null);
    const registerUser = useContext(LoggedContext).registerUser
    const {toggleUpdate} = useContext(DataContext);
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        registerUser(username,email,name,password,department,deployment,title, setMessage);
        setTimeout(()=>{
            navigate('/');
            toggleUpdate();
        },3000)
        
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
            <div className='input__div'><label htmlFor="department">Department:</label><select type="text" value={department} onChange={event => setDepartment(event.target.value)}>
                <option value="">Select department</option>
                <option value="JavaScript1">JavaScript1</option>
                <option value="JavaScript2">JavaScript2</option>
                <option value="Python1">Python1</option>
                <option value="Java2">Java2</option>
                </select></div>
            <div className='input__div'><label htmlFor='deployment'>Deployment:</label><select type="text" value={deployment} onChange={event => setDeployment(event.target.value)}>
                <option value="">Select deployment</option>
                <option value="DUO 1">DUO 1</option>
                <option value="DUO 2">DUO 2</option>
                <option value="DUO 3">DUO 3</option>
                <option value="DUO 4">DUO 4</option>
                </select></div>
            <div className='input__div'><p>Title:</p><input type="text" value={title} onChange={event => setTitle(event.target.value)}/></div>
            <div className='reg__div'><input className='btn btn__input2' type="submit" value="REGISTER" /></div>
        </form>
        <h2 className='title__h2'>{message}</h2>
        </div>
    </section>
  )
}

export default Register