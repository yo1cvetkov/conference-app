import "./conference.css";
import React, { useContext, useState} from "react";
import { LoggedContext } from "../AuthContext";
import { Link } from "react-router-dom";
import noImg from "../assets/noImg.jpg";
import { BiEdit } from "react-icons/bi";
import { BsCalendar3,  BsFillClockFill } from "react-icons/bs";
import { getUser } from "../service/AuthService";
import { DataContext } from "../DataContext";
import { technologiesData } from "../technologiesData";
import EditModal from "../modals/EditModal";

function Conference(props) {
  const { name, startDate, endDate, startTime, endTime, description ,id, technologies, attenders} = props;
  const [attendState, setAttendState] = useState(attenders);
  const [showNewEdit, setShowNewEdit] = useState(false);
  const logContext = useContext(LoggedContext);
  const attendConf = useContext(DataContext).attendToConference;
  let user;
  logContext.logged ? user = getUser().name : "";

  const attendUpdate = (event) => {
    event.preventDefault();
    setAttendState(oldVal => {
      const updatedState = oldVal.includes(user) ? Array.from(oldVal).filter(it => it !== user) : [...oldVal, user];
      attendConf(name, updatedState);
      return updatedState;
    });
    
  } 

  return (
    <div className="conference__main__div">
      <EditModal open={showNewEdit} setOpen={setShowNewEdit} name={name} startDate={startDate} endDate={endDate} startTime={startTime} endTime={endTime} description={description}/>
      <div className="left__div">
        <img className="no__img" src={noImg} alt="no_image" />
        <div className="info__div">
          <Link to={`/conference/${name}`}>
            <h2 className="name__h2">{name}</h2>
          </Link>
          <div className="icon__name__div">
            <BsCalendar3 />
            <p className="p__bold">{startDate}</p>
          </div>
          <div className="icon__name__div">
            <BsFillClockFill />
            <p className="p__bold">{startTime}</p>
          </div>
        </div>
      </div>
      <div className="right__div">
        <div className="tech__div">
          <p className="tech__p">Technologies :</p>
          <div className="icon__div">
            {technologiesData.map((obj,i)=>{
              return technologies.includes(obj.title) ? <img className="tech__icon" src={obj.icon} alt="nema" key={obj.id}/> : null
            })}
          </div>
        </div>
        {logContext.logged && <div className="attend__edit__div">
            <div className="edit__div">
              <div className="edit__div__sm">
              {id === user ? <BiEdit  onClick={()=> setShowNewEdit(old => !old)}/> : <p className="edit__p">{`Author: ${id}`}</p>}
              {id === user && <p className="edit__p"  onClick={()=> setShowNewEdit(old => !old)}>Edit</p>}
              </div>
            </div>

          <form onSubmit={attendUpdate}>
            <input className="btn btn__input" type="submit" value={attendState.includes(user) ? "Cancel -" : "Attend +"} />
          </form>
        </div>}
      </div>
    </div>
  );
}

export default Conference;
