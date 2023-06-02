import React, { useState, useContext } from "react";
import "./Events.css";
import Conference from "../../components/Conference.jsx";
import { HiPlus } from "react-icons/hi";
import { MdArrowDownward, MdClose } from "react-icons/md";
import Sketch from "../../assets/sketch.png";
import { useQuery } from "@tanstack/react-query";
import { getConferences } from "../../utils/getConferences";
import { technologiesData } from "../../utils/technologiesData";
import Checkbox from "../../components/ui/Checkbox";
import { AuthCtx } from "../../context/AuthCtx";

const mappedTechnologies = technologiesData.map((object) => object.technology);
const technologies = mappedTechnologies.map(
  (technology) => technology[0].toUpperCase() + technology.slice(1)
);

export default function Events() {
  const [showNewConf, setShowNewConf] = useState(false);

  const { authed } = useContext(AuthCtx);

  const conferencesQuery = useQuery({
    queryKey: ["conferences"],
    queryFn: getConferences,
  });

  return (
    <section className="container">
      <div className="events__container">
        <AddConfModal open={showNewConf} setOpen={setShowNewConf} />
        <div className="conference__container">
          <div className="title__div">
            <h2 className="title__h2">Upcoming Events</h2>
            <button className="sort__btn flex items-center gap-1 text-[--accent-color]">
              <MdArrowDownward className="text-lg" />
              <span className="text-lg font-medium">Most recent</span>
            </button>
          </div>
          {conferencesQuery.data?.map((conference) => {
            return (
              <Conference
                key={conference.id}
                id={conference.id}
                name={conference.title}
                date={conference.startDate}
                startTime={conference.startTime}
                endTime={conference.endTime}
                technologies={conference.technologies}
                isShow={true}
              />
            );
          })}
        </div>
        <div className="add__container">
          {authed ? (
            <button
              className="text-white bg-[--accent-color] fixed bottom-10 right-10 text-4xl rounded-full p-5 shadow-xl"
              onClick={() => setShowNewConf(true)}
            >
              <HiPlus />
            </button>
          ) : null}
          <div className="quote__div">
            <h2 className="quote__h2">
              Make sure that you're signed in before attending an event!
            </h2>
            <img src={Sketch} alt="enjoy" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AddConfModal({ open, setOpen }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const { user } = useContext(AuthCtx);

  const creatorId = user ? user.sub : null;

  return (
    <>
      <div
        className={`${
          open
            ? "h-auto opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        } transition-all inset-2 overflow-scroll xl:overflow-auto ease-linear py-6 px-3 duration-200 fixed xl:py-7 xl:px-14 z-30 xl:bottom-5 xl:right-5 xl:left-auto xl:top-auto xl:w-1/3 bg-white shadow-md ring-1 ring-[--color-gray-light-transparent] rounded-lg`}
      >
        <div className="flex justify-between items-center">
          <h4 className="text-[--accent-color] text-xl lg:text-xl lg:font-semibold">
            Add new event
          </h4>
          <button onClick={() => setOpen(false)}>
            <MdClose className="text-3xl text-[--accent-color]" />
          </button>
        </div>

        <form>
          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">Title</label>
            <input
              required
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Add event title"
              className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
            />
          </div>
          <div className="grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-y-5  text-[--accent-color] mt-5 xl:flex-row">
            <div className="lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2">
              <label className="block text-md font-medium">Start date</label>
              <input
                required
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                type="date"
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>
            <div className="mt-5 lg:mt-0 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-2">
              <label className="block text-md font-medium">End date</label>
              <input
                required
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                type="date"
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>

            <div className="mt-5 lg:mt-0 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
              <label className="block text-md font-medium">Start time</label>
              <input
                required
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                type="time"
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>
            <div className="mt-5 lg:mt-0 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
              <label className="block text-md font-medium">End time</label>
              <input
                required
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
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
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              type="text"
              placeholder="Add event url"
              className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
            />
          </div>
          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">Description</label>
            <textarea
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add event description..."
              maxLength="200"
              rows="4"
              cols="1"
              className="input__border overflow-y-scroll placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] rounded-lg px-3 py-1 lg:py-2"
            />
          </div>
          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">
              Select appropriate technologies
            </label>
            <div className="flex gap-5 mt-4 flex-wrap">
              {technologies.map((item, index) => (
                <Checkbox
                  item={item}
                  key={index}
                  selectedTechnologies={selectedTechnologies}
                  setSelectedTechnologies={setSelectedTechnologies}
                />
              ))}
            </div>
          </div>
          <button className="mx-auto mt-8 flex items-center gap-3 py-3 px-6 bg-[--accent-color] rounded-2xl hover:bg-[--accent-color-light] transition-all duration-150">
            <HiPlus className="text-white" />
            <span className="text-lg font-semibold text-white">
              Create event
            </span>
          </button>
        </form>
      </div>
    </>
  );
}
