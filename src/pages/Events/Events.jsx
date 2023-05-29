import React from 'react'
import "./Events.css"
import {conferenceData} from '../../conferenceData.js'
import Conference from '../../components/Conference.jsx'
import {HiPlus} from "react-icons/hi"
import Sketch from "../../assets/sketch.png"

function Events() {
  return (
    <section className='container'>
      <div className='events__container'>
        
      <div className='conference__container'>
        <div className='title__div'>
        <h2 className="title__h2">Upcoming Events</h2>
        <p className='sort__btn'>&#8595; Most recent</p>
        </div>
        {conferenceData.map((obj,i)=>{
          return <Conference key={i} id={obj.id} name={obj.name} date={obj.date} time={obj.time} isShow={true}/>
        })}
      </div>
      <div className='add__container'>
        <div className='btn add__btn text-white'>
          <HiPlus />
          <p className='p__create'>Create new event</p>
        </div>
        <div className='quote__div'>
          <h2 className='quote__h2'>Make sure that you're signed in before attending an event</h2>
          <img src={Sketch} alt="enjoy" />
        </div>
      </div>
      </div>
    </section>
  )
}

export default Events