import "./singlePage.css"
import React, { useContext, useState, useEffect } from 'react'
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
    const conferences = useContext(DataContext).conferences;
    if(!conferences) return <div>loading...</div>
    const confArr = conferences.filter(obj=>obj.name===nameC);
    const {name, startDate, startTime, endDate, description, author_id, technologies, attenders} = confArr[0];
    const isLogged = useContext(LoggedContext).logged;
    const [attendState, setAttendState] = useState(attenders);
    const attendConf = useContext(DataContext).attendToConference;
    const [user, setUser] = useState(null);

    useEffect(() => {
      if (isLogged) {
        const currentUser = {
          name: getUser().name,
          user_id: getUser().user_id,
        };
        setUser(currentUser);
      }
    }, [isLogged]);
  

    const attendUpdate = (event) => {
      event.preventDefault();
      setAttendState((oldVal) => {
        const userString = JSON.stringify(user);
        const updatedState = oldVal.some((item) => item.user_id == user.user_id) ? oldVal.filter((it) => JSON.stringify(it) !== userString) : [...oldVal, user];
        attendConf(name, updatedState, conferences, user);
        return updatedState;
      });
    };

    const imgUrl = `https://conf-app-bucket.s3.eu-central-1.amazonaws.com/`;
    
  return (
    <section className='container'>
        <h2 className="title__single__h2">{name}</h2>
      <div className='single__container'>
        <img src={imgUrl+name+".png" || imgUrl+name+".jpg"} alt="No-image" />
        <div className='conf__info'>
          <div className='icon__name__div'><BsCalendar3 /><p className='p__bold'>Start Date:</p></div>
          <p>{startDate}</p>

          <div className='icon__name__div'><BsCalendar3 /><p className='p__bold'>End Date:</p></div>
          <p>{endDate}</p>

          <div className='icon__name__div'><BsFillClockFill /><p className='p__bold'>Time:</p></div>
          <p>{startTime}</p>

          <div className='icon__name__div'><FaUser /><p className='p__bold'>Creator:</p></div>
          <p>{author_id}</p>

          <div className='icon__name__div'><BiMessage /><p className='p__bold'>Description:</p></div>
          <p>{description}</p>
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
            <input className="btn btn__input" type="submit" value={attendState.some((item) => item.user_id === user.user_id) ? "Cancel -" : "Attend +"} />
          </form>}
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