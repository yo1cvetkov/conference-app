import React from 'react'
import "./conference.css"
import noImg from "../assets/noImg.jpg"
import {SiJavascript} from "react-icons/si"
import { Link } from 'react-router-dom'
import {BiEdit} from 'react-icons/bi'
import {BsCalendar3, BsClockFill} from "react-icons/bs"
import {BsFillClockFill} from "react-icons/bs"
import {FcCancel} from "react-icons/fc"


function Conference(props) {
    const {id, name, date, time, isShow} = props;
    console.log(isShow);
 
  return (
    <div className='conference__main__div'>
        <div className='left__div'>
        <img className='no__img' src={noImg} alt="no_image" />
        <div className='info__div'>
            <Link to={`/conference/${id}`}>
                <h2 className='name__h2'>{name}</h2>
            </Link>
            <div className='icon__name__div'>
            <BsCalendar3 />
            <p className='p__bold'>{date}</p>
          </div>
          <div className='icon__name__div'>
            <BsFillClockFill/>
            <p className='p__bold'>{time}</p>
          </div>
        </div>
        </div>
        <div className='right__div'>
        <div className='tech__div'>
            <p className='tech__p'>Technologies :</p>
            <div className='icon__div'>
                <SiJavascript />
                <SiJavascript />
            </div>
        </div>
        <div className={isShow ? 'attend__edit__div' : 'cancel__div'}>
        <Link>
            <div className='edit__div'>
            {isShow ? <BiEdit /> : <FcCancel />}
            <p className='edit__p'>{isShow ? "Edit" : "Cancel Conference"}</p>
            </div>
        </Link>

        <Link to='/id' className={isShow ? "" : "hide__link"}>
            <div className='btn'>Attend +</div>
        </Link>
        </div>
        </div>
        </div>
  )
}

export default Conference