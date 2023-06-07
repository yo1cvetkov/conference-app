import React, { useContext } from 'react'
import Conference from '../../components/Conference.jsx'
import Sketch from "../../assets/sketch.png"
import "./MyEvents.css"
import { getUser } from '../../service/AuthService.js'
import { DataContext } from '../../DataContext.jsx'

function MyEvents() {
  const confArray = useContext(DataContext).conferences;
  if(!confArray) return <div>loading...</div>
  const confArr = confArray.filter(obj=>obj.author_id === getUser().name);
  
  return (
    <section className='container'>
      <h2>My Events</h2>
      <div className='my__events__container'>
      {confArr.length > 0 ? <div className='conference__container'>
        {confArr.map((obj,i)=>{
          return <Conference key={i} id={obj.author_id} name={obj.name} startDate={obj.startDate} endDate={obj.endDate} startTime={obj.startTime} endTime={obj.endTime} description={obj.description} attenders={obj.attenders}/>
        })}
      </div> : <h2 className='title__h2'>YOU HAVEN'T CREATED ANY CONFERENCE YET.</h2>}
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