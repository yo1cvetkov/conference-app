import "./Events.css";
import React, { useState, useContext } from "react";
import Conference from "../../components/Conference.jsx";
import { HiPlus } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import Sketch from "../../assets/sketch.png";
import { LoggedContext } from "../../AuthContext";
import { DataContext } from "../../DataContext";

const dummyTechnologies = [
  {
    id: 1,
    title: "JavaScript",
  },
  {
    id: 2,
    title: "Python",
  },
  {
    id: 3,
    title: "Docker",
  },
];

function Events() {
  const [showNewConf, setShowNewConf] = useState(false);
  const loggedC = useContext(LoggedContext);
  const confArr = useContext(DataContext).conferences;
  if(!confArr) return <div>loading...</div>


  return (
    <section className="container">
      <div className="events__container">
        <AddConfModal open={showNewConf} setOpen={setShowNewConf} />
        <div className="conference__container">
          <div className="title__div">
            <h2 className="title__h2">Upcoming Events</h2>
            <p className="sort__btn">&#8595; Most recent</p>
          </div>
          {confArr.map((obj, i) => {
            return <Conference key={i} id={obj.author_id} name={obj.name} startDate={obj.startDate} endDate={obj.endDate} startTime={obj.startTime} endTime={obj.endTime} description={obj.description} attenders={obj.attenders}/>
          })}
        </div>
        <div className="add__container">
          {loggedC.logged && <button
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

export function AddConfModal({ open, setOpen }) {
  const crudURL = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/conference';
  
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [message, setMessage] = useState(null);
  const isLogged = useContext(LoggedContext).logged;
  const createConference = useContext(DataContext).createConference;
  if(!isLogged) setOpen(false);

  const handleCheck = (event) => {
    setTechnologies(oldVal => event.target.checked ? [...oldVal, event.target.name] : oldVal.map(it=>it===event.target.name?'':it).filter(it=>it!==''));
  };

  const createHandler = (event) => {
    event.preventDefault();
        createConference(name, startDate, endDate, startTime, endTime, url, description, technologies, setMessage);
        setName('');setStartDate('');setEndDate('');setStartTime('');setEndTime('');setUrl('');setDescription('');setTechnologies([]);
    }


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

        <form onSubmit={createHandler}>
          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="Add event title"
              className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
            />
          </div>
          <div className="grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-y-5  text-[--accent-color] mt-5 xl:flex-row">
            <div className="lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2">
              <label className="block text-md font-medium">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={event => setStartDate(event.target.value)}
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>
            <div className="mt-5 lg:mt-0 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-2">
              <label className="block text-md font-medium">End date</label>
              <input
                type="date"
                value={endDate}
                onChange={event => setEndDate(event.target.value)}
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>

            <div className="mt-5 lg:mt-0 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
              <label className="block text-md font-medium">Start time</label>
              <input
                type="time"
                value={startTime}
                onChange={event => setStartTime(event.target.value)}
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>
            <div className="mt-5 lg:mt-0 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
              <label className="block text-md font-medium">End time</label>
              <input
                type="time"
                value={endTime}
                onChange={event => setEndTime(event.target.value)}
                placeholder="Enter conference title"
                className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
              />
            </div>
          </div>

          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">Url</label>
            <input
              type="text"
              value={url}
              onChange={event => setUrl(event.target.value)}
              placeholder="Add event url"
              className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
            />
          </div>
          <div className="flex flex-col text-[--accent-color] mt-8">
            <label className="text-md font-medium">Description</label>
            <textarea
              value={description}
              onChange={event => setDescription(event.target.value)}
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
            <div className="flex gap-5 mt-4">
              {dummyTechnologies.map((item) => (
                <div key={item.id} className="flex items-center gap-1">
                  <input type="checkbox" className="w-4 h-4" onChange={handleCheck} name={item.title}/>
                  <span className="text-md font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
          <input className="btn btn__input2" type="submit" value="CREATE EVENT" />
          {message}
        </form>
      </div>
    </>
  );
}
