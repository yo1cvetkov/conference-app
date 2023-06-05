import React, { useContext } from "react";
import noImg from "../assets/noImg.jpg";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { technologiesData } from "../utils/technologiesData";
import { AuthCtx } from "../context/AuthCtx";
import format from "date-fns/format";
import { HiPlus } from "react-icons/hi";

function Conference({
  id,
  name,
  date,
  startTime,
  endTime,
  isShow,
  technologies,
  creatorId,
}) {
  const normalizedTechnologies = technologies.map((technology) =>
    technology.trim().toLowerCase()
  );

  let filteredTechnologies = [];

  for (let i = 0; i < normalizedTechnologies.length; i++) {
    let singleTech = normalizedTechnologies[i];

    const foundObj = technologiesData.find(
      (obj) => obj.technology === singleTech
    );

    filteredTechnologies.push(foundObj);
  }

  const { authed, user } = useContext(AuthCtx);

  const splittedDate = date.split("-");
  const year = splittedDate[0];
  const month = splittedDate[1];
  const day = splittedDate[2];

  const newDate = new Date(year, month, day);
  const formattedDate = format(newDate, "dd MMMM yyyy");

  const isCreator = user?.sub === creatorId ? true : false;

  return (
    <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-1 rounded-2xl shadow-md">
      <div className="flex items-center">
        <img
          className="h-40 w-40 row-start-1 row-end-2 rounded-2xl p-4"
          src={noImg}
          alt="no_image"
        />
        <div className="flex flex-col gap-4 row-start-2 row-end-3">
          <Link to={`/conference/${id}`}>
            <h2 className="font-semibold text-lg lg:mb-0 lg:text-2xl">
              {name}
            </h2>
          </Link>
          <div className="flex items-center gap-4">
            <BsCalendar3 className="text-lg text-[--color-gray-dark]" />
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-4">
            <BsFillClockFill className="text-lg text-[--color-gray-dark]" />
            <p className="font-medium">
              {startTime} - {endTime}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between p-4">
        <div className="grid gap-4">
          <p className="font-bold text-[--color-gray-dark]">Technologies :</p>
          <div className="flex gap-4 flex-wrap ">
            {filteredTechnologies.map((technology) => (
              <img
                key={technology.id}
                src={technology.icon}
                className="w-6 h-6"
              />
            ))}
          </div>
        </div>
        <div
          className={`${
            isShow
              ? "flex flex-row items-center lg:flex-col lg:items-start gap-4"
              : "grid place-items-center"
          } mt-10 lg:mt-0`}
        >
          {authed && isCreator ? (
            <Link>
              <div className="flex items-center gap-1 text-[--color-gray-dark]">
                <BiEdit className="text-lg" />
                <p className="text-md font-semibold">Edit</p>
              </div>
            </Link>
          ) : null}

          {authed ? (
            <button className="mx-auto  flex items-center gap-3 py-3 px-6 bg-[--accent-color] rounded-2xl hover:bg-[--accent-color-light] transition-all duration-150">
              <HiPlus className="text-white" />
              <span className="text-lg font-semibold text-white">Attend</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Conference;
