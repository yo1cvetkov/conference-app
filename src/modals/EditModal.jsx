import React, { useContext } from 'react'
import { MdClose } from "react-icons/md";
import { useState } from 'react';
import { DataContext } from '../DataContext';

function EditModal({open , setOpen, name, startDate, endDate, startTime, endTime, description}) {
        const [startDateState, setStartDateState] = useState(startDate);
        const [endDateState, setEndDateState] = useState(endDate);
        const [startTimeState, setStartTimeState] = useState(startTime);
        const [endTimeState, setEndTimeState] = useState(endTime);
        const [descriptionState, setDescriptionState] = useState(description);
        const [message, setMessage] = useState(null);
        const editConference = useContext(DataContext).editConference;

    
    const editHandler = (event) => {
        event.preventDefault();
        editConference(name, startDateState, endDateState, startTimeState, endTimeState, descriptionState, setMessage);
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
                {`Edit ${name}`}
              </h4>
              <button onClick={() => setOpen(false)}>
                <MdClose className="text-3xl text-[--accent-color]" />
              </button>
            </div>
    
            <form onSubmit={editHandler}>
              <div className="grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-y-5  text-[--accent-color] mt-5 xl:flex-row">
                <div className="lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2">
                  <label className="block text-md font-medium">Start date</label>
                  <input
                    type="date"
                    value={startDateState}
                    onChange={event => setStartDateState(event.target.value)}
                    placeholder="Enter conference title"
                    className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                  />
                </div>
                <div className="mt-5 lg:mt-0 lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-2">
                  <label className="block text-md font-medium">End date</label>
                  <input
                    type="date"
                    value={endDateState}
                    onChange={event => setEndDateState(event.target.value)}
                    placeholder="Enter conference title"
                    className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                  />
                </div>
    
                <div className="mt-5 lg:mt-0 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3">
                  <label className="block text-md font-medium">Start time</label>
                  <input
                    type="time"
                    value={startTimeState}
                    onChange={event => setStartTimeState(event.target.value)}
                    placeholder="Enter conference title"
                    className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                  />
                </div>
                <div className="mt-5 lg:mt-0 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
                  <label className="block text-md font-medium">End time</label>
                  <input
                    type="time"
                    value={endTimeState}
                    onChange={event => setEndTimeState(event.target.value)}
                    placeholder="Enter conference title"
                    className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                  />
                </div>
              </div>
    
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">Description</label>
                <textarea
                  value={descriptionState}
                  onChange={event => setDescriptionState(event.target.value)}
                  placeholder="Add event description..."
                  maxLength="200"
                  rows="4"
                  cols="1"
                  className="input__border overflow-y-scroll placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] rounded-lg px-3 py-1 lg:py-2"
                />
              </div>
              <input className="btn btn__input2 mt-8 mx-auto mb-8" type="submit" value="EDIT EVENT" />
              <div className='text-2xl'>{message}</div>
            </form>
          </div>
        </>
      );
    }
    

export default EditModal