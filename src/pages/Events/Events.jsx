import React from 'react'
import "./Events.css"
import {conferenceData} from '../../conferenceData.js'
import Conference from '../../components/Conference.jsx'
import {HiPlus} from "react-icons/hi"

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
          return <Conference key={i} id={obj.id} name={obj.name} date={obj.date} time={obj.time}/>
        })}
      </div>
      <div className='add__container'>
        <div className='btn add__btn'>
          <HiPlus />
          <p>Create new event</p>
        </div>
        <div className='quote__div'></div>
      </div>
      </div>
    </section>
  )
}

export default Events