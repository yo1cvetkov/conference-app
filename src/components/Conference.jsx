import "./conference.css";
import React, { useContext, useState} from "react";
import { LoggedContext } from "../AuthContext";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BsCalendar3,  BsFillClockFill } from "react-icons/bs";
import { getUser } from "../service/AuthService";
import { DataContext } from "../DataContext";
import { technologiesData } from "../technologiesData";
import EditModal from "../modals/EditModal";

function Conference(props) {
  const { name, startDate, endDate, startTime, endTime, description, author_id, technologies, attenders, userConfArr} = props;
 
  const isLogged = useContext(LoggedContext).logged;
  const {attendToConference, attendConfereceToUsers, conferences, users, toggleUpdate} = useContext(DataContext)

  const [showNewEdit, setShowNewEdit] = useState(false);
  const [error, setError] = useState(null);
  if(!users) return <div>Loading...</div>
  const userName = users.filter(obj => obj.user_id === author_id)[0].name;

  let user = null;
  let isAdmin = false;
  if(isLogged) {
    user = {
     name: getUser().name,
     user_id: getUser().user_id
  }
  isAdmin = users.filter(obj => obj.user_id === user.user_id)[0].isAdmin;
}
  if(isLogged && !user) return <div>Loading...</div>
  
  


  const attendUpdate = (event) => {
    event.preventDefault();
  
    const userString = JSON.stringify(user);
    const updatedState = attenders.some((item) => item.user_id === user.user_id) ? attenders.filter((item) => JSON.stringify(item) !== userString): [...attenders, user];
  
    attendToConference(name, updatedState, conferences, userConfArr).then((response) => {
        if (response.status === 401) console.log('Overlap');
        else {
          const updatedUserState = userConfArr.includes(name) ? userConfArr.filter((it) => it !== name) : [...userConfArr, name];
          attendConfereceToUsers(user.user_id, updatedUserState);
          toggleUpdate();
        }
      })
      .catch((error) => {setError(error+"")});
      setTimeout(()=>{setError(null)},2000);
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
            <p className="p__bold">{startDate} | {endDate}</p>
          </div>
          <div className="icon__name__div">
            <BsFillClockFill />
            <p className="p__bold">{startTime} - {endTime}</p>
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
              {isAdmin || author_id === user.user_id ? <BiEdit  onClick={()=> setShowNewEdit(old => !old)}/> : <p className="edit__p">{`Author: ${userName}`}</p>}
              {isAdmin || author_id === user.user_id ? <p className="edit__p"  onClick={()=> setShowNewEdit(old => !old)}>Edit</p> : null}
              </div>
            </div>

          <form onSubmit={attendUpdate}>
            <input className="btn btn__input" type="submit" value={attenders.some((item) => item.user_id === user.user_id) ? "Cancel -" : "Attend +"} />
          </form>
          <p className="text-red-700">{error}</p>
        </div>}
      </div>
    </div>
  );
}

export default Conference;
