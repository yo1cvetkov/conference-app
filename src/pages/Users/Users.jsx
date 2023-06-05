import React, { useState } from "react";
import User from "../../components/User.jsx";
import Skeleton from "react-loading-skeleton";
import Sketch from "../../assets/sketch.png";
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
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../utils/getAllUsers.js";

function Users() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <section className="container my-40">
      <h2 className="font-bold text-[--accent-color] text-2xl mb-5 lg:text-2xl">
        Users
      </h2>
      <div className="grid items-start grid-cols-1 lg:grid-cols-4 gap-12 text-[--accent-color]">
        <div className="col-start-1 gap-12 col-end-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {usersQuery.isLoading ? (
            <div className="flex gap-12">
              <Skeleton count={3} className="w-60 h-52 mb-12" />
              <Skeleton count={3} className="w-60 h-52 mb-12" />
              <Skeleton count={3} className="w-60 h-52 mb-12" />
            </div>
          ) : (
            usersQuery.data?.map((confUser) => (
              <User key={confUser.id} confUser={confUser} />
            ))
          )}
        </div>
        <div>
          <div className="pb-1">
            <h2 className="px-9 font-semibold text-2xl">
              Make sure that you're signed in before attending an event!
            </h2>
            <img src={Sketch} alt="enjoy" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Users;

export function UserDetails({
  openModal,
  setOpenModal,
  name,
  title,
  department,
  deliveryUnit,
}) {
  return createPortal(
    <>
      <>
        <div
          className={`${
            openModal ? "visible" : "hidden"
          } bg-[--color-black-transparent] top-0 z-20 left-0 fixed h-full w-full`}
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
                {name}
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
                {title}
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
                {department}
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
                {deliveryUnit}
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
