import React from 'react'
import {conferenceData} from '../../conferenceData.js'
import Conference from '../../components/Conference.jsx'
import Sketch from "../../assets/sketch.png"
import "./MyEvents.css"

function MyEvents() {
  return (
    <section className='container'>
      <h2>My Events</h2>
      <div className='my__events__container'>
      <div className='conference__container'>
        {conferenceData.map((obj,i)=>{
          return <Conference key={i} id={obj.id} name={obj.name} date={obj.date} time={obj.time} isShow={false}/>
        })}
      </div>
      <div className='my__add__container'>
        <div className='quote__div'>
          <h2 className='quote__h2'>Make sure that you're signed in before attending an event</h2>
          <img src={Sketch} alt="enjoy" />
        </div>
      </div>
      </div>
    </section>
  )
}

export default MyEvents