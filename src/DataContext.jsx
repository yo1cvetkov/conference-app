import { createContext } from "react";
import { useState } from "react";
import axios from "axios";


export const DataContext = createContext({
    conferences: [],
    setConferences: () => {},
    fetchConferences: () => {},
    users: [],
    setUsers: () => {},
    fetchUsers: () => {}
})

export default function DataProvider({children}){
    const fetchConfURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/conferences';
    const fetchUsersURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/users';
    const [conferences, setConferences] = useState(null);
    const [users, setUsers] = useState(null);

    const fetchConferences = () => {
        const requestConfig = {
            headers: {
              'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
            }
          }
          localStorage.clear();
          const savedConferences = localStorage.getItem('conferences');
          if (savedConferences) {
            setConferences(JSON.parse(savedConferences));
          } else {
            axios
              .get(fetchConfURL, requestConfig)
              .then((response) => {
                setConferences(response.data.conferences);
                localStorage.setItem('conferences', JSON.stringify(response.data.conferences));
              })
              .catch((error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                  console.log('failed');
                } else {
                  console.log('failed');
                }
              });
          }
    }

    const fetchUsers = () => {
      const requestConfig = {
          headers: {
            'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
          }
        }
        localStorage.clear();
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        } else {
          axios
            .get(fetchUsersURL, requestConfig)
            .then((response) => {
              setUsers(response.data.users);
              localStorage.setItem('users', JSON.stringify(response.data.users));
            })
            .catch((error) => {
              if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                console.log('failed');
              } else {
                console.log('failed');
              }
            });
        }
    }
    
    const contextValue = {
        conferences: conferences,
        setConferences,
        fetchConferences,
        users: users,
        setUsers,
        fetchUsers
    }
    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}