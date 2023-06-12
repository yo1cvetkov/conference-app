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
    createConference: () => {},
    editConference: () => {},
    attendConfereceToUsers: () => {},
    update: false
})

export default function DataProvider({children}){
    const fetchConfURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/conferences';
    const fetchUsersURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/users';
    const attendURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/conference';
    const editURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/edit';
    const [conferences, setConferences] = useState(null);
    const [users, setUsers] = useState(null);
    const [update, setUpdate] = useState(false);

    const toggleUpdate = () => {
      setUpdate(old=>!old);
    }

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
          toggleUpdate();
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
            author_id: getUser().user_id,
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
            setTimeout(()=>{
              setMessage(null)
          }, 1500);
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
          toggleUpdate();
          setMessage("Uspesno ste izmenili konferenciju!");
          setTimeout(()=>{
            setMessage(null)
        }, 1500);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const attendToConference = (name, attenders, allConferences, userAttendingConferences) => {
      toggleUpdate();
      const requestConfig = {
        headers: {
          'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
        }
      }
      const requestBody = {
        name: name,
        valueKey: attenders,
        allConferences: allConferences,
        userAttendingConferences: userAttendingConferences
      }

        axios.patch(attendURL, requestBody, requestConfig).then((response) => {
          })
          .catch(error => {
            if(error.response.status === 401) {
                console.log(error.response.status);
            }else{
                console.log('sorry backend failed')
            }
        })
        
    }

    const attendConfereceToUsers = (user_id, attendedConferences) => {
      const requestConfig = {
        headers: {
          'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo',
        }
      }
      const requestBody = {
        user_id: user_id,
        valueKey: attendedConferences
      }

        axios.patch(fetchUsersURL, requestBody, requestConfig).then((response) => {
          toggleUpdate();
        }).catch((error) => {
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
        createConference,
        editConference,
        attendConfereceToUsers,
        update
    }


    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}