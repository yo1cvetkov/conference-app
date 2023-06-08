import React, { useContext, useState } from 'react'
import "./singlePage.css"
import { useParams } from 'react-router-dom'
import noImg from "../../assets/noImg.jpg"
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
    const confArrS = useContext(DataContext).conferences;
    if(!confArrS) return <div>loading...</div>
    const confArr = confArrS.filter(obj=>obj.name===nameC);
    const {name, startDate, startTime, endDate, description, author_id, technologies, attenders} = confArr[0];
    const isLogged = useContext(LoggedContext).logged;
    const [attendState, setAttendState] = useState(attenders);
    const attendConf = useContext(DataContext).attendToConference;
    let user;
    isLogged ? user = getUser().name : "";

    const attendUpdate = (event) => {
      event.preventDefault();
      setAttendState(oldVal => {
        const updatedState = oldVal.includes(user) ? Array.from(oldVal).filter(it => it !== user) : [...oldVal, user];
        attendConf(name, updatedState);
        return updatedState;
      });
      
    } 


    
  return (
    <section className='container'>
        <h2 className="title__single__h2">{name}</h2>
      <div className='single__container'>
        <img src={noImg} alt="No-image" />
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
            <input className="btn btn__input" type="submit" value={attendState.includes(user) ? "Cancel -" : "Attend +"} />
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
                <p>{item}</p>
            </div>
            )
        }) : <h3>Currently there are no attenders for this conference</h3>}
      </div>
    </section>
  )
}

export default SinglePage