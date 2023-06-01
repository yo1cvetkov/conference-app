import "./navbar.css";
import { useContext, useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data";
import { GoThreeBars } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";
import { createPortal } from "react-dom";

import "./SignInModal.css";
import { AuthCtx, useAuth } from "../context/AuthCtx";

export default function Navbar() {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, authed, setAuthed, getSession, logout } = useAuth();

  console.log("User :", user);
  console.log("Authed : ", authed);

  useEffect(() => {
    getSession().then(() => {
      setAuthed(true);
    });
  }, []);

  return (
    <>
      <SignupModal
        openModal={openSignupModal}
        setOpenModal={setOpenSignupModal}
      />
      <LoginModal
        openModal={openLoginModal}
        setOpenModal={setOpenLoginModal}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
      />
      <nav>
        <div className="container nav__container">
          <div className="logo__div">
            <Link to="/" className="logo__link">
              <p className="text-2xl text-white">Conference</p>
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
            {user ? (
              <span className="text-white mr-3">{user.username || user}</span>
            ) : null}
            {authed ? (
              <button onClick={() => logout()}>Log out</button>
            ) : (
              <div className="flex lg:flex-row gap-6">
                <button
                  className="sign__in-btn"
                  onClick={() => setOpenLoginModal(true)}
                >
                  <HiUserCircle />
                  Sign In
                </button>
                <button
                  className="sign__up-btn"
                  onClick={() => setOpenSignupModal(true)}
                >
                  Sign up
                </button>
              </div>
            )}

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

export function SignupModal({ openModal, setOpenModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [deliveryUnit, setDeliveryUnit] = useState("");

  return createPortal(
    <>
      {openModal ? (
        <div className="relative flex item-center justify-center">
          <div className="sign-in__modal" onClick={() => setOpenModal(false)} />
          <div className="flex fixed z-20 font-semibold h-min flex-col mt-24 bg-white p-10 rounded-lg lg:w-1/2 lg:mx-auto">
            <p className="text-xl lg:text-3xl lg:font-semibold">Sign Up</p>
            <form className="lg:grid lg:grid-cols-2 lg:grid-rows-5 lg:gap-x-10">
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">E-mail</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">Job title</label>
                <input
                  type="text"
                  placeholder="Enter your job title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">Department</label>
                <input
                  type="text"
                  placeholder="Enter your department"
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-8 row-start-3 row-end-4">
                <label className="text-md font-medium">Delivery unit</label>
                <input
                  type="text"
                  placeholder="Enter your delivery unit"
                  value={deliveryUnit}
                  onChange={(event) => setDeliveryUnit(event.target.value)}
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-8 row-start-4 row-end-5">
                <label className="text-md font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <button
                className="mx-auto col-span-2 self-center mt-8 text-lg block font-semibold text-white gap-3 py-3 px-6 bg-[--accent-color] rounded-2xl hover:bg-[--accent-color-light] transition-all duration-150"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
}

export function LoginModal({
  openModal,
  setOpenModal,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const { authenticate, authed, setAuthed, setUser } = useContext(AuthCtx);

  function onLogin(event) {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log(data);
        setAuthed(true);
        setUser(data.idToken.payload.sub);
        setOpenModal(false);
      })
      .catch((err) => {
        console.err(err);
      });
  }

  return createPortal(
    <>
      {openModal ? (
        <div className="relative flex item-center justify-center">
          <div className="sign-in__modal" onClick={() => setOpenModal(false)} />
          <div className="flex fixed z-20 font-semibold h-min flex-col mt-24 bg-white p-10 rounded-lg lg:w-1/2 lg:mx-auto">
            <p className="text-xl lg:text-3xl lg:font-semibold">Sign In</p>
            <form onSubmit={onLogin}>
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">E-mail</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-5">
                <label className="text-md font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <button className="btn mx-auto mt-5" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
}
