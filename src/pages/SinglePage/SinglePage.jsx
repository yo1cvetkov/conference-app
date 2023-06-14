import "./singlePage.css"
import React, { useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import {FaUser} from "react-icons/fa"
import {BsCalendar3} from "react-icons/bs"
import {BsFillClockFill} from "react-icons/bs"
import {BiMessage} from "react-icons/bi"
import { LoggedContext } from '../../AuthContext';
import { DataContext } from '../../DataContext';
import { getUser } from '../../service/AuthService'
import { technologiesData } from '../../technologiesData'

function SinglePage() {
    const ParamObj = useParams();
    const nameC = ParamObj.name;

    const isLogged = useContext(LoggedContext).logged;
    const {conferences, users, attendToConference, attendConfereceToUsers} = useContext(DataContext);

    if(!conferences) return <div>loading...</div>
    if(!users) return <div>Loading...</div>

    const confArr = conferences.filter(obj=>obj.name===nameC);
    const {name, startDate, startTime, endDate, endTime, description, author_id, technologies, attenders} = confArr[0];
    const [error, setError] = useState(null);
    const userName = users.filter(obj => obj.user_id === author_id)[0].name;

    let user = null;
    let userConfArr = null;

    if(isLogged) {
      user = {
          name: getUser().name,
          user_id: getUser().user_id,
      }
      userConfArr = users.filter(obj => obj.user_id === getUser().user_id)[0].attendedConferences;
  }
  
    if(isLogged && !user) return <div>Loading...</div>
  

    const attendUpdate = (event) => {
    event.preventDefault();
  
    const userString = JSON.stringify(user);
    const updatedState = attenders.some((item) => item.user_id === user.user_id) ? attenders.filter((item) => JSON.stringify(item) !== userString): [...attenders, user];
  
    attendToConference(name, updatedState, conferences, userConfArr).then((response) => {
        if (response.status === 401) console.log('Overlap');
        else {
          const updatedUserState = userConfArr.includes(name) ? userConfArr.filter((it) => it !== name) : [...userConfArr, name];
          attendConfereceToUsers(user.user_id, updatedUserState);
        }
      })
      .catch((error) => {setError(error+"")});
      setTimeout(()=>{setError(null)},2000);
  };

    const imgUrl = `https://conf-app-bucket.s3.eu-central-1.amazonaws.com/`;
    
  return (
    <section className='container'>
        <h2 className="title__single__h2">{name}</h2>
      <div className='single__container'>
        <img src={imgUrl+name+".png"} alt="No-image" />
        <div className='conf__info'>
          <div className='icon__name__div'><BsCalendar3 /><p className='p__bold'>Start Date:</p></div>
          <p className="p__props">{startDate}</p>

          <div className='icon__name__div'><BsCalendar3 /><p className='p__bold'>End Date:</p></div>
          <p className="p__props">{endDate}</p>

          <div className='icon__name__div'><BsFillClockFill /><p className='p__bold'>Time:</p></div>
          <p className="p__props">{startTime} - {endTime}</p>

          <div className='icon__name__div'><FaUser /><p className='p__bold'>Creator:</p></div>
          <p className="p__props">{userName}</p>

          <div className='icon__name__div'><BiMessage /><p className='p__bold'>Description:</p></div>
          <p className="p__props">{description}</p>
        </div>

        <div className='tec__div'>
          <div className='tec__icon__div'>
            <p className='tech__p'>Technologies :</p>
            <div className='icon__div'>
            {technologiesData.map((obj,i)=>{
              return technologies.includes(obj.title) ? <img className="tech__icon" src={obj.icon} alt="nema"/> : null
            })}
            </div>
            </div>
            {isLogged && <form className="single__form" onSubmit={attendUpdate}>
            <input className="btn btn__input" type="submit" value={attenders.some((item) => item.user_id === user.user_id) ? "Cancel -" : "Attend +"} />
          </form>}
          <p className="text-red-700 text-2xl">{error}</p>
        </div>
      </div>
      <div className='users__div'>
        <h2 className='title__single__h2'>Attenders:</h2>
      </div>
      <div className='user__names__div'>
        {attenders.length > 0 ? attenders.map((item,i)=>{
            return (
            <div className='single__user' key={i}>
                <FaUser />
                <p>{item.name}</p>
            </div>
            )
        }) : <h3>Currently there are no attenders for this conference</h3>}
      </div>
    </section>
  )
}

export default SinglePage