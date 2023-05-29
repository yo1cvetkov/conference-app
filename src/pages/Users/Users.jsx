import React from 'react'
import User from "../../components/User.jsx"
import { userData } from '../../userData.js'
import Sketch from "../../assets/sketch.png"
import "./Users.css"

function Users() {
  return (
    <section className='container'>
      <h2 className="title__h2">Users</h2>
      <div className='users__container'>
      <div className='user__info__container'>
        {userData.map((obj,i)=>{
          return <User key={i} id={obj.id} name={obj.name} desc={obj.desc} dep={obj.dep} del={obj.del}/>
        })}
      </div>
      <div className='pic__container'>
        <div className='quote__div'>
          <h2 className='quote__h2'>Make sure that you're signed in before attending an event</h2>
          <img src={Sketch} alt="enjoy" />
        </div>
      </div>
      </div>
    </section>
  )
}

export default Users