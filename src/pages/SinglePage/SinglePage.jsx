import React from 'react'
import "./singlePage.css"
import { useParams } from 'react-router-dom'
import { conferenceData } from '../../conferenceData';
import { userData } from '../../userData';
import noImg from "../../assets/noImg.jpg"
import {SiJavascript} from "react-icons/si"
import {AiOutlineUser} from "react-icons/ai"

function SinglePage() {
    const ParamObj = useParams();
    const id = ParamObj.id;
    const confArr = conferenceData.filter(obj=>obj.id==id);
    const {name, date, time, endDate, desc, creator} = confArr[0];
    
  return (
    <section className='container'>
        <h2 className="title__h2">{name}</h2>
      <div className='single__container'>
        <img src={noImg} alt="No-image" />
        <div className='conf__info'>
                    <p>Start Date:</p>
                    <p>{date}</p>
                    <p>End Date:</p>
                    <p>{endDate}</p>
                    <p>Time:</p>
                    <p>{time}</p>
                    <p>Creator:</p>
                    <p>{creator}</p>
                    <p>Description:</p>
                    <p>{desc}</p>
        </div>
        <div className='tec__div'>
            <p className='tech__p'>Technologies :</p>
            <div className='icon__div'>
                <SiJavascript />
                <SiJavascript />
            </div>
        </div>
      </div>
      <div className='users__div'>
        <h2 className='title__h2'>Users:</h2>
      </div>
      <div className='user__names__div'>
        {userData.map(obj=>{
            return (
            <div className='single__user'>
                <AiOutlineUser />
                <p>{obj.name}</p>
            </div>
            )
        })}
      </div>
    </section>
  )
}

export default SinglePage