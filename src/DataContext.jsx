import { createContext } from "react";
import { useState } from "react";
import { getUser } from "./service/AuthService";
import axios from "axios";


export const DataContext = createContext({
    conferences: [],
    setConferences: () => {},
    fetchConferences: () => {},
    users: [],
    setUsers: () => {},
    fetchUsers: () => {},
    attendToConference: () => {},
    update: false,
    createConference: () => {},
    editConference: () => {}
})

export default function DataProvider({children}){
    const fetchConfURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/conferences';
    const fetchUsersURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/users';
    const attendURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/conference';
    const editURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/edit';
    const [conferences, setConferences] = useState(null);
    const [users, setUsers] = useState(null);
    const [update, setUpdate] = useState(false)

    const fetchConferences = () => {
        const requestConfig = {
            headers: {
              'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
            }
          }
            axios
              .get(fetchConfURL, requestConfig)
              .then((response) => {
                setConferences(response.data.conferences);
              })
              .catch((error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                  console.log('failed');
                } else {
                  console.log('failed');
                }
              });
          
    }

    const fetchUsers = () => {
      const requestConfig = {
          headers: {
            'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
          }
        }
          axios
            .get(fetchUsersURL, requestConfig)
            .then((response) => {
              setUsers(response.data.users);
            })
            .catch((error) => {
              if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                console.log('failed');
              } else {
                console.log('failed');
              }
            });
        
    }

    const createConference = (name, startDate, endDate, startTime, endTime, url, description, technologies, setMessage) =>{
          if(name.trim('') === "" || startDate.trim('') === "" || endDate.trim('') === "" || startTime.trim('') === "" || endTime.trim('') === "" || url.trim('') === ""){
            setMessage("All fields are required");
            return;
        }

        const requestConfig = {
          headers: {
              'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo'
          }
      }

        const requestBody = {
            name: name,
            author_id: getUser().name,
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            url: url,
            description: description,
            technologies: technologies
        }

        axios.post(attendURL, requestBody, requestConfig).then(response => {
            setMessage("Konferencija kreirana!");
        }).catch(error => {
            if(error.response.status === 401) {
                setMessage(error.response.data.message);
            }else{
                setMessage('sorry backend failed')
            }
        })

    }

    const editConference = (name, startDate, endDate, startTime, endTime, description, setMessage) => {
      const requestConfig = {
        headers: {
          'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
        }
      }
      const requestBody = {
        name: name,
        valueKey: startDate,
        valueKey2: endDate,
        valueKey3: startTime,
        valueKey4: endTime,
        valueKey5: description
      }

        axios.patch(editURL, requestBody, requestConfig).then((response) => {
          setMessage("Uspesno ste izmenili konferenciju!")
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const attendToConference = (name, attenders) => {
      const requestConfig = {
        headers: {
          'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
        }
      }
      const requestBody = {
        name: name,
        valueKey: attenders
      }

        axios.patch(attendURL, requestBody, requestConfig).then((response) => {
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const contextValue = {
        conferences: conferences,
        setConferences,
        fetchConferences,
        users: users,
        setUsers,
        fetchUsers,
        attendToConference,
        update: update,
        createConference,
        editConference
    }


    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}