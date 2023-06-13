import "./conference.css";
import React, { useContext, useState, useEffect} from "react";
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
  const { name, startDate, endDate, startTime, endTime, description, author_id, technologies, attenders, userConfArr} = props;
 
  const isLogged = useContext(LoggedContext).logged;
  const attendConf = useContext(DataContext).attendToConference; 
  const attendUser = useContext(DataContext).attendConfereceToUsers;
  const conferences = useContext(DataContext).conferences;
  const update = useContext(DataContext).update;

  const [attendState, setAttendState] = useState(attenders);
  const [currentConferences, setCurrentConferences] = useState([]);
  const [showNewEdit, setShowNewEdit] = useState(false);

  let user = null;
  if(isLogged) user = {
    name: getUser().name,
    user_id: getUser().user_id,
  };

  if(isLogged && !user) return <div>Loading...</div>

  useEffect(() => {
    setCurrentConferences(userConfArr);
  }, [userConfArr, update]);
  
  const attendUpdate = (event) => {
    event.preventDefault();
    setAttendState((oldVal) => {
      const userString = JSON.stringify(user);
      const updatedState = oldVal.some((item) => item.user_id === user.user_id) ? oldVal.filter((it) => JSON.stringify(it) !== userString) : [...oldVal, user];
      attendConf(name, updatedState, conferences, userConfArr);
      return updatedState;
    });


    setCurrentConferences((oldVal) => {
      const updatedState = oldVal.includes(name) ? oldVal.filter((it) => it !== name) : [...oldVal, name];
      attendUser(user.user_id, updatedState);
      return updatedState;
    })
  };

  const imgUrl = `https://conf-app-bucket.s3.eu-central-1.amazonaws.com/`
 
  return (
    <div className="conference__main__div">
      <EditModal open={showNewEdit} setOpen={setShowNewEdit} name={name} startDate={startDate} endDate={endDate} startTime={startTime} endTime={endTime} description={description}/>
      <div className="left__div">
        <img className="no__img" src={imgUrl+name+".png"} alt={"There is no image for this Conference."} />
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
            {technologiesData.map(obj=>{
              return technologies.includes(obj.title) ? <img className="tech__icon" src={obj.icon} alt="nema" key={obj.id}/> : null
            })}
          </div>
        </div>
        {isLogged && <div className="attend__edit__div">
            <div className="edit__div">
              <div className="edit__div__sm">
              {author_id ? <BiEdit  onClick={()=> setShowNewEdit(old => !old)}/> : <p className="edit__p">{`Author: ${author_id}`}</p>}
              {author_id  && <p className="edit__p"  onClick={()=> setShowNewEdit(old => !old)}>Edit</p>}
              </div>
            </div>

          <form onSubmit={attendUpdate}>
            <input className="btn btn__input" type="submit" value={attendState.some((item) => item.user_id === user.user_id) ? "Cancel -" : "Attend +"} />
          </form>
        </div>}
      </div>
    </div>
  );
}

export default Conference;
