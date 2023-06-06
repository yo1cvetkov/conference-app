import "./conference.css";
import React, { useContext, useState } from "react";
import { LoggedContext } from "../AuthContext";
import { Link } from "react-router-dom";
import noImg from "../assets/noImg.jpg";
import { SiJavascript } from "react-icons/si";
import { BiEdit } from "react-icons/bi";
import { BsCalendar3,  BsFillClockFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { getUser } from "../service/AuthService";



function Conference(props) {
  const { name, date, time, id, attenders } = props;
  const logContext = useContext(LoggedContext);
  const attendUpdate = () => {

  } 

  return (
    <div className="conference__main__div">
      <div className="left__div">
        <img className="no__img" src={noImg} alt="no_image" />
        <div className="info__div">
          <Link to={`/conference/${name}`}>
            <h2 className="name__h2">{name}</h2>
          </Link>
          <div className="icon__name__div">
            <BsCalendar3 />
            <p className="p__bold">{date}</p>
          </div>
          <div className="icon__name__div">
            <BsFillClockFill />
            <p className="p__bold">{time}</p>
          </div>
        </div>
      </div>
      <div className="right__div">
        <div className="tech__div">
          <p className="tech__p">Technologies :</p>
          <div className="icon__div">
            <SiJavascript />
            <SiJavascript />
          </div>
        </div>
        {logContext.logged && <div className={id === getUser().username ? "cancel__div" : "attend__edit__div"}>
          <Link>
            <div className="edit__div">
              {id === getUser().username ? <BiEdit /> : null}
              <p className="edit__p">{id === getUser().username ? "Edit" : `Author: ${id ? id : "Unknown"}`}</p>
            </div>
          </Link>

          <form onSubmit={attendUpdate} className={id === getUser().username ? "hide__link" : "" }>
            <input className="btn btn__input" type="submit" value="Attend +" />
          </form>
        </div>}
      </div>
    </div>
  );
}

export default Conference;
