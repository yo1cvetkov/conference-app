import "./Events.css";
import React, { useState, useContext} from "react";
import Conference from "../../components/Conference.jsx";
import { HiPlus } from "react-icons/hi";
import { AddConfModal } from "../../modals/AddConfModal";
import Sketch from "../../assets/sketch.png";
import { LoggedContext } from "../../AuthContext";
import { DataContext } from "../../DataContext";
import { getUser } from "../../service/AuthService";

function Events() {
  const [showNewConf, setShowNewConf] = useState(false);
  const [update, setUpdate] = useState(false);
  
  const isLogged = useContext(LoggedContext).logged;
  const {conferences, setConferences, users} = useContext(DataContext);
  
  if(!users) return <div>loading...</div>
  if(!conferences) return <div>loading...</div>

  let userConfArr = null;
  if(isLogged) userConfArr = users.filter(obj => obj.user_id === getUser().user_id)[0].attendedConferences;
  
  const sortHandle = () => {
    setConferences(oldVal => oldVal.sort((a,b)=>{
      const aTime = new Date(a.startDate).getTime() + a.startTime.split(":").map((e,i)=>i===0?+e:+e/60).reduce((a,c)=>a+c,0);
      const bTime = new Date(b.startDate).getTime() + b.startTime.split(":").map((e,i)=>i===0?+e:+e/60).reduce((a,c)=>a+c,0);
      return aTime - bTime;
    }))
    setUpdate(old => !old)
  }

  return (
    <section className="container">
      <div className="events__container">
        <AddConfModal open={showNewConf} setOpen={setShowNewConf} />
        <div className="conference__container">
          <div className="title__div">
            <h2 className="title__h2">Upcoming Events</h2>
            <p className="sort__btn" onClick={sortHandle}>&#8595; Most recent</p>
          </div>
          {conferences.map((obj, i) => {
            return <Conference 
                key={i}
                author_id={obj.author_id} 
                name={obj.name} 
                startDate={obj.startDate} 
                endDate={obj.endDate} 
                startTime={obj.startTime} 
                endTime={obj.endTime} 
                description={obj.description} 
                technologies={obj.technologies} 
                attenders={obj.attenders}
                userConfArr={userConfArr}/>
          })}
        </div>
        <div className="add__container">
          {isLogged && <button
            className="text-white bg-[--accent-color] fixed bottom-10 right-10 text-4xl rounded-full p-5 shadow-xl"
            onClick={() => setShowNewConf(true)}
          >
            <HiPlus />
          </button>}
          <div className="quote__div">
            <h2 className="quote__h2">
              Make sure that you're signed in before attending an event
            </h2>
            <img src={Sketch} alt="enjoy" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Events;

