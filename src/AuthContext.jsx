import { createContext } from "react";
import { useState } from "react";
import React from 'react'
import { resetUserSession } from "./service/AuthService";


export const LoggedContext = createContext({
    logged: false,
    setLogged: () => {},
    logOutHandler: () => {},
})

export default function LoggedProvider({children}){
    const [logged, setLogged] = useState(false);
    
    
    const logOutHandler = () => {
        resetUserSession();
        setLogged(false);
      }

    const contextValue = {
        logged: logged,
        setLogged,
        logOutHandler,

    }
    return (
        <LoggedContext.Provider value={contextValue}>
            {children}
        </LoggedContext.Provider>
    )
}