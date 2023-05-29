import "./navbar.css";
import { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data";
import { GoThreeBars } from "react-icons/go";
import { createPortal } from "react-dom";
import "./SignInModal.css";

export default function Navbar() {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
      <nav>
        <div className="container nav__container">
          <div className="logo__div">
            <p className="text-2xl text-white">Conference</p>
            <Link to="/" className="link">
              <img src={Logo} alt="Nav Logo" className="h-10" />
            </Link>
          </div>
          <ul
            className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}
          >
            {links.map((obj, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={obj.path}
                    onClick={() => setIsNavShowing((oldVal) => false)}
                    className={({ isActive }) => (isActive ? "active-nav" : "")}
                  >
                    {obj.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="end__point">
            <button onClick={() => setOpenModal(true)}>Sign in</button>

            <button
              onClick={() => setIsNavShowing((oldVal) => !oldVal)}
              className="nav__toggle-btn"
            >
              <GoThreeBars />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Modal({ openModal, setOpenModal }) {
  return createPortal(
    <>
      {openModal ? (
        <div className="relative flex item-center justify-center">
          <div className="sign-in__modal" onClick={() => setOpenModal(false)} />
          <div className="flex fixed z-20 font-semibold h-min flex-col mt-24 bg-white p-10 rounded-lg lg:w-1/2 lg:mx-auto">
            <p className="text-xl lg:text-3xl lg:font-semibold">Sign In</p>
            <form>
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">E-mail</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-5">
                <label className="text-md font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <button className="btn mx-auto mt-5">Sign In</button>
            </form>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
}
