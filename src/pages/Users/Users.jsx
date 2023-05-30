import React, { useState } from "react";
import User from "../../components/User.jsx";
import { userData } from "../../userData.js";
import Sketch from "../../assets/sketch.png";
import "./Users.css";
import { createPortal } from "react-dom";
import {
  MdApartment,
  MdArrowForward,
  MdAssignment,
  MdClose,
  MdFlag,
  MdPerson,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { BiRun } from "react-icons/bi";

function Users() {
  const [openUserDetails, setOpenUserDetails] = useState(false);

  return (
    <section className="container">
      <UserDetails
        openModal={openUserDetails}
        setOpenModal={setOpenUserDetails}
      />
      <h2>Users</h2>
      <div className="users__container">
        <div className="user__info__container">
          {userData.map((obj, i) => {
            return (
              <User
                key={i}
                id={obj.id}
                name={obj.name}
                desc={obj.desc}
                dep={obj.dep}
                del={obj.del}
                setOpenUserDetails={setOpenUserDetails}
              />
            );
          })}
        </div>
        <div className="pic__container">
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

export default Users;

export function UserDetails({ openModal, setOpenModal }) {
  return createPortal(
    <>
      <>
        <div
          className={`${
            openModal ? "visible" : "hidden"
          } bg-[--color-black-transparent] top-0 z-10 left-0 fixed h-full w-full`}
          onClick={() => setOpenModal(false)}
        />
        <div
          className={`${
            openModal
              ? "translate-x-0 overflow-auto"
              : "translate-x-[999px] overflow-hidden"
          } py-10 px-5 lg:py-20 lg:px-12 transition-all duration-300 fixed right-0 top-0 z-20 w-3/4 lg:w-1/3 h-full bg-white`}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-xl lg:text-2xl font-semibold">User Details</h4>
            <button onClick={() => setOpenModal(false)}>
              <MdClose className="text-2xl text-[--accent-color] font-semibold" />
            </button>
          </div>

          <div className="grid mt-10 lg:grid-cols-2 lg:grid-rows-2 lg:mt-20 lg:gap-8">
            <div className="mb-5 lg:mb-0">
              <div className="flex gap-2 items-center mb-1 lg:mb-3">
                <MdPerson className="text-[--color-gray-medium]" />
                <span className="text-[--color-gray-medium] font-medium">
                  Full name
                </span>
              </div>
              <p className="font-semibold text-[--accent-color] text-2xl">
                Petar Petrovic
              </p>
            </div>
            <div className="mb-5 lg:mb-0">
              <div className="flex gap-2 items-center mb-1 lg:mb-3">
                <MdFlag className="text-[--color-gray-medium]" />
                <span className="text-[--color-gray-medium] font-medium">
                  Position
                </span>
              </div>
              <p className="font-semibold text-[--accent-color] text-2xl">
                Full-stack developer
              </p>
            </div>
            <div className="mb-5 lg:mb-0">
              <div className="flex gap-2 items-center mb-1 lg:mb-3">
                <MdApartment className="text-[--color-gray-medium]" />
                <span className="text-[--color-gray-medium] font-medium">
                  Department
                </span>
              </div>
              <p className="font-semibold text-[--accent-color] text-2xl">
                JavaScript
              </p>
            </div>
            <div className="mb-5 lg:mb-0">
              <div className="flex gap-2 items-center mb-1 lg:mb-3">
                <MdAssignment className="text-[--color-gray-medium]" />
                <span className="text-[--color-gray-medium] font-medium">
                  Delivery Unit
                </span>
              </div>
              <p className="font-semibold text-[--accent-color] text-2xl">
                Java 2
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-[--color-gray-medium] font-medium text-xl mt-10 lg:mt-20">
            <BiRun className="text-[--color-gray-medium]" />
            Attends
          </div>
          <ul className="mt-5">
            <li className="mb-5">
              <Link
                className="text-xl lg:text-2xl flex gap-2 items-center text-[--accent-color]"
                to="/"
              >
                <MdArrowForward />
                <span className="hover:translate-x-4 hover:text-[--accent-color-light] transition-all duration-200">
                  NodeJS Conference
                </span>
              </Link>
            </li>
            <li className="mb-5">
              <Link
                className="text-xl lg:text-2xl flex gap-2  items-center text-[--accent-color]"
                to="/"
              >
                <MdArrowForward />
                <span className="hover:translate-x-4 hover:text-[--accent-color-light] transition-all duration-200">
                  Serverless AWS Conf
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </>
    </>,
    document.getElementById("modal")
  );
}
