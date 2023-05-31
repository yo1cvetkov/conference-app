import React from "react";
import "./singlePage.css";
import { useParams } from "react-router-dom";
import { conferenceData } from "../../conferenceData";
import { userData } from "../../userData";
import noImg from "../../assets/noImg.jpg";
import { FaUser } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";
import { Link } from "react-router-dom";

function SinglePage() {
  const ParamObj = useParams();
  const id = ParamObj.id;
  const confArr = conferenceData.filter((obj) => obj.id == id);
  const { name, date, time, endDate, desc, creator } = confArr[0];

  return (
    <section className="container">
      <h2 className="title__single__h2">{name}</h2>
      <div className="single__container">
        <img src={noImg} alt="No-image" />
        <div className="conf__info">
          <div className="icon__name__div">
            <BsCalendar3 />
            <p className="p__bold">Start Date:</p>
          </div>
          <p>{date}</p>

          <div className="icon__name__div">
            <BsCalendar3 />
            <p className="p__bold">End Date:</p>
          </div>
          <p>{endDate}</p>

          <div className="icon__name__div">
            <BsFillClockFill />
            <p className="p__bold">Time:</p>
          </div>
          <p>{time}</p>

          <div className="icon__name__div">
            <FaUser />
            <p className="p__bold">Creator:</p>
          </div>
          <p>{creator}</p>

          <div className="icon__name__div">
            <BiMessage />
            <p className="p__bold">Description:</p>
          </div>
          <p>{desc}</p>
        </div>

        <div className="tec__div">
          <div className="tec__icon__div">
            <p className="tech__p">Technologies :</p>
            <div className="icon__div">
              <img
                className="w-10 h-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              />

              <img
                className="w-10 h-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
              />

              <img
                className="w-10 h-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg"
              />
            </div>
          </div>
          <Link to="/id">
            <div className="btn single__btn">Attend +</div>
          </Link>
        </div>
      </div>
      <div className="users__div">
        <h2 className="title__single__h2">Attenders:</h2>
      </div>
      <div className="user__names__div">
        {userData.map((obj) => {
          return (
            <div className="single__user">
              <FaUser />
              <p>{obj.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SinglePage;
