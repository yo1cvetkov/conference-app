import { createContext } from "react";
import { useState } from "react";
import {setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios";


export const LoggedContext = createContext({
    logged: false,
    setLogged: () => {},
    logOutHandler: () => {},
    errorMessage: '',
    setErrorMessage: () => {},
    loginHandler: () => {},

})

export default function LoggedProvider({children}){
    const [logged, setLogged] = useState(false);
    const loginUrl = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/login';
    const [errorMessage, setErrorMessage] = useState(null);

    
    const logOutHandler = () => {
        resetUserSession();
        setLogged(false);
      }

      const loginHandler = (username, password, closeModal, setUsername, setPassword) => {
        if(username.trim() === '' || password.trim() === '') {
          setErrorMessage('Username and passwords are both required');
          return;
        }
    
            setErrorMessage(null);
            const requestConfig = {
            headers: {
                'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo'
            }
            }
    
            const requestBody = {
            username: username,
            password: password
            }
        
            axios.post(loginUrl, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            closeModal(); setUsername(''); setPassword('');
            }).catch((error)=>{
            if(error.response.status === 401 || error.response.status === 403) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Sorry backend failed');
            }
            });
        };

    const contextValue = {
        logged: logged,
        setLogged,
        logOutHandler,
        errorMessage,
        setErrorMessage,
        loginHandler

    }
    return (
        <LoggedContext.Provider value={contextValue}>
            {children}
        </LoggedContext.Provider>
    )
}