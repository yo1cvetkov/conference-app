import React from 'react'
import "./conference.css"
import noImg from "../assets/noImg.jpg"
import {SiJavascript} from "react-icons/si"
import { Link } from 'react-router-dom'
import {BiEdit} from 'react-icons/bi'

function Conference(props) {
    const {id, name, date, time} = props;
 
  return (
    <div className='conference__main__div'>
        <div className='left__div'>
        <img className='no__img' src={noImg} alt="no_image" />
        <div className='info__div'>
            <Link to={`/conference/${id}`}>
                <h2 className='name__h2'>{name}</h2>
            </Link>
            <p>{date}</p>
            <p>{time}</p>
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
        <div className='attend__edit__div'>
        <Link>
            <div className='edit__div'>
            <BiEdit />
            <p className='edit__p'>Edit</p>
            </div>
        </Link>

        <Link to='/id'>
            <div className='btn'>Attend+</div>
        </Link>
        </div>
        </div>
        </div>
  )
}

export default Conference