import React, { useContext } from 'react'
import "./singlePage.css"
import { useParams } from 'react-router-dom'
import noImg from "../../assets/noImg.jpg"
import {SiJavascript} from "react-icons/si"
import {FaUser} from "react-icons/fa"
import {BsCalendar3} from "react-icons/bs"
import {BsFillClockFill} from "react-icons/bs"
import {BiMessage} from "react-icons/bi"
import { Link } from 'react-router-dom';
import { LoggedContext } from '../../AuthContext';
import { DataContext } from '../../DataContext';

function SinglePage() {

    const ParamObj = useParams();
    const nameC = ParamObj.name;
    const confArrS = useContext(DataContext).conferences;
    const userData = useContext(DataContext).users;
    if(!confArrS || !userData) return <div>loading...</div>
    const confArr = confArrS.filter(obj=>obj.name===nameC);
    const {name, startDate, startTime, endDate, description, author_id, attenders} = confArr[0];
    const isLogged = useContext(LoggedContext).logged;
    
    
  return (
    <section className='container'>
        <h2 className="title__single__h2">{name}</h2>
      <div className='single__container'>
        <img src={noImg} alt="No-image" />
        <div className='conf__info'>

          <div className='icon__name__div'>
            <BsCalendar3 />
            <p className='p__bold'>Start Date:</p>
          </div>
            <p>{startDate}</p>

            <div className='icon__name__div'> 
            <BsCalendar3 />
            <p className='p__bold'>End Date:</p>
          </div>
            <p>{endDate}</p>

            <div className='icon__name__div'>
            <BsFillClockFill />
            <p className='p__bold'>Time:</p>
          </div>
            <p>{startTime}</p>

            <div className='icon__name__div'>
            <FaUser />
            <p className='p__bold'>Creator:</p>
          </div>
            <p>{author_id}</p>

            <div className='icon__name__div'>
            <BiMessage />
            <p className='p__bold'>Description:</p>
          </div>
            <p>{description}</p>
        </div>

        <div className='tec__div'>
          <div className='tec__icon__div'>
            <p className='tech__p'>Technologies :</p>
            <div className='icon__div'>
                <SiJavascript />
                <SiJavascript />
            </div>
            </div>
            {isLogged && <Link to='/id'>
            <div className='btn single__btn'>Attend +</div>
            </Link>}
        </div>
      </div>
      <div className='users__div'>
        <h2 className='title__single__h2'>Attenders:</h2>
      </div>
      <div className='user__names__div'>
        {userData.map((obj,i)=>{
            return (
            <div className='single__user' key={i}>
                <FaUser />
                <p>{obj.name}</p>
            </div>
            )
        })}
      </div>
    </section>
  )
}

export default SinglePage