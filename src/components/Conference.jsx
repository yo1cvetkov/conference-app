import React, { useContext, useState } from "react";
import noImg from "../assets/noImg.jpg";
import { Link, useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { technologiesData } from "../utils/technologiesData";
import { AuthCtx } from "../context/AuthCtx";
import format from "date-fns/format";
import { HiPlus } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdClose } from "react-icons/md";
import Checkbox from "./ui/Checkbox";
import { editConference } from "../utils/editConference";

const mappedTechnologies = technologiesData.map((object) => object.technology);
const allTechnologies = mappedTechnologies.map(
  (technology) => technology[0].toUpperCase() + technology.slice(1)
);

function Conference({
  id,
  name,
  url,
  startDate,
  endDate,
  startTime,
  endTime,
  description,
  isInMyEvents,
  technologies,
  creatorId,
  setShowEditConf,
  showEditConf,
  sorted,
  setSorted,
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

  const { authed, user, admin } = useContext(AuthCtx);

  let formattedStartDate;

  // console.log(sorted);

  if (sorted) {
    const newDate = new Date(startDate);
    formattedStartDate = format(newDate, "dd MMMM yyyy");
  } else {
    const splittedStartDate = startDate.split("-");
    const startYear = splittedStartDate[0];
    const startMonth = splittedStartDate[1] - 1;
    const startDay = splittedStartDate[2];

    const newDate = new Date(startYear, startMonth, startDay);
    formattedStartDate = format(newDate, "dd MMMM yyyy");
  }

  const isCreator = user?.sub === creatorId ? true : false;

  return (
    <>
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
              <p className="font-medium">{formattedStartDate}</p>
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
              "flex flex-row items-center lg:flex-col lg:items-start gap-4" +
              "grid place-items-center"
            } mt-10 lg:mt-0`}
          >
            {(admin && authed) || (authed && isCreator) ? (
              <Link
                to={`/conference/${id}`}
                className="flex items-center gap-1 text-[--color-gray-dark]"
              >
                <BiEdit className="text-lg" />
                <p className="text-md font-semibold">Edit</p>
              </Link>
            ) : null}

            {authed && !isInMyEvents ? (
              <Link
                to={`/conference/${id}`}
                className="mx-auto  flex items-center gap-3 py-3 px-6 bg-[--accent-color] rounded-2xl hover:bg-[--accent-color-light] transition-all duration-150"
              >
                <HiPlus className="text-white" />
                <span className="text-lg font-semibold text-white">Attend</span>
              </Link>
            ) : null}
            {isInMyEvents ? (
              <Link
                to={`/conference/${id}`}
                className="flex items-center gap-2 ring-1 transition-all duration-200 hover:bg-[--color-gray-light-transparent] ring-[--color-gray-light-transparent] rounded-xl py-2 px-4 "
              >
                <FcCancel className="text-lg" />
                <span className="text-red-500">Cancel conference</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Conference;

export function EditConfModal({
  open,
  setOpen,
  confTitle,
  startDate,
  endDate,
  startTime,
  endTime,
  url,
  description,
  technologies,
}) {
  const [currentTitle, setCurrentTitle] = useState(confTitle);
  const [currentStartTime, setCurrentStartTime] = useState(startTime);
  const [currentEndTime, setCurrentEndTime] = useState(endTime);
  const [currentStartDate, setCurrentStartDate] = useState(startDate);
  const [currentEndDate, setCurrentEndDate] = useState(endDate);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentSelectedTechnologies, setCurrentSelectedTechnologies] =
    useState(technologies);
  const { user } = useContext(AuthCtx);

  const queryClient = useQueryClient();

  const { id } = useParams();

  const editConferenceBody = {
    title: currentTitle,
    startTime: currentStartTime,
    endTime: currentEndTime,
    startDate: currentStartDate,
    endDate: currentEndDate,
    url: currentUrl,
    description: currentDescription,
    technologies: currentSelectedTechnologies,
  };

  // function resetForm() {
  //   setTitle("");
  //   setDescription("");
  //   setEndDate("");
  //   setEndTime("");
  //   setStartDate("");
  //   setStartTime("");
  //   setUrl("");
  //   setSelectedTechnologies(null);
  // }
  // console.log(id);
  // const queryClient = useQueryClient();

  // const conferenceQuery = queryClient.fetchQuery({
  //   queryKey: ["conference", id],
  //   queryFn: async () => await getSingleConference(id),
  // });

  const editMutation = useMutation({
    mutationFn: () => editConference(id, editConferenceBody),
    onSuccess: () => {
      queryClient.invalidateQueries(["conference", id]);
      setOpen(false);
    },
  });

  return (
    <>
      {/* Add the overlay */}
      <div
        className={`${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-all inset-2 overflow-scroll xl:overflow-auto ease-linear py-6 px-3 duration-200 fixed xl:py-7 xl:px-14 z-30 xl:bottom-5 xl:right-5 xl:left-auto xl:top-auto xl:w-1/3 bg-white shadow-md ring-1 ring-[--color-gray-light-transparent] rounded-lg`}
      >
        <div className="flex justify-between items-center">
          <h4 className="text-[--accent-color] text-xl lg:text-xl lg:font-semibold">
            Edit this event
          </h4>
          <button onClick={() => setOpen(false)}>
            <MdClose className="text-3xl text-[--accent-color]" />
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            editMutation.mutate();
          }}
        >
          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">Title</label>
            <input
              required
              type="text"
              value={currentTitle}
              onChange={(event) => setCurrentTitle(event.target.value)}
              placeholder="Add event title"
              className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
            />
          </div>
          <div className="grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-y-5  text-[--accent-color] mt-5 xl:flex-row">
            <div className="lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2">
              <label className="block text-md font-medium">Start date</label>
              <input
                required
                value={currentStartDate}
                onChange={(event) => setCurrentStartDate(event.target.value)}
                type="date"
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>
            <div className="mt-5 lg:mt-0 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-2">
              <label className="block text-md font-medium">End date</label>
              <input
                required
                value={currentEndDate}
                onChange={(event) => setCurrentEndDate(event.target.value)}
                type="date"
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>

            <div className="mt-5 lg:mt-0 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
              <label className="block text-md font-medium">Start time</label>
              <input
                required
                value={currentStartTime}
                onChange={(event) => setCurrentStartTime(event.target.value)}
                type="time"
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>
            <div className="mt-5 lg:mt-0 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
              <label className="block text-md font-medium">End time</label>
              <input
                required
                value={currentEndTime}
                onChange={(event) => setCurrentEndTime(event.target.value)}
                type="time"
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>
          </div>

          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">Url</label>
            <input
              required
              value={currentUrl}
              onChange={(event) => setCurrentUrl(event.target.value)}
              type="text"
              placeholder="Add event url"
              className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
            />
          </div>
          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">Description</label>
            <textarea
              required
              value={currentDescription}
              onChange={(event) => setCurrentDescription(event.target.value)}
              placeholder="Add event description..."
              maxLength="200"
              rows="4"
              cols="1"
              className="input__border overflow-y-scroll placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] rounded-lg px-3 py-1 lg:py-2"
            />
          </div>
          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">
              Select technologies you want to add
            </label>
            <div className="flex gap-5 mt-4 flex-wrap">
              {allTechnologies.map((item, index) => (
                <Checkbox
                  item={item}
                  key={index}
                  selectedTechnologies={currentSelectedTechnologies}
                  setSelectedTechnologies={setCurrentSelectedTechnologies}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto mt-8 flex items-center gap-3 py-3 px-6 bg-[--accent-color] rounded-2xl hover:bg-[--accent-color-light] transition-all duration-150"
          >
            <HiPlus className="text-white" />
            <span className="text-lg font-semibold text-white">
              Submit edit
            </span>
          </button>
        </form>
      </div>
    </>
  );
}
