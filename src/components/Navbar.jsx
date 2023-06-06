import "./navbar.css";
import { useContext, useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data";
import { GoThreeBars } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { createPortal } from "react-dom";
import UserPool from "../aws/UserPool";
import { AuthCtx, useAuth } from "../context/AuthCtx";

export default function Navbar() {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, authed, setAuthed, getSession, logout } = useAuth();

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
      <nav className="w-screen py-6 bg-[--accent-color] grid place-items-center fixed top-0 left-0 z-10 drop-shadow-xl">
        <div className="container px-8 lg:px-0 h-full flex justify-between items-center relative">
          <div className="logo__div">
            <Link to="/" className="flex items-end">
              <p className="text-2xl text-white hidden lg:block">Conference</p>
              <img src={Logo} alt="Nav Logo" className="h-10" />
            </Link>
          </div>
          <ul
            className={`nav__links absolute top-[56px] -right-[10%] -left-[10%] gap-0 flex-col flex lg:flex-row lg:items-center lg:gap-10 lg:static ${
              isNavShowing ? "flex lg:flex" : "hidden lg:flex"
            }`}
          >
            <li className="text-white font-semibold h-16 w-full lg:h-auto lg:w-auto">
              <NavLink
                to="/"
                onClick={() => setIsNavShowing((oldVal) => false)}
                className={({ isActive }) =>
                  isActive ? "relative text-white lg:border-b lg:pb-1" : null
                }
              >
                EVENTS
              </NavLink>
            </li>
            <li className="text-white font-semibold h-16 w-full lg:h-auto lg:w-auto">
              <NavLink
                to={`/my-events/${user ? user.sub : null}`}
                onClick={() => setIsNavShowing((oldVal) => false)}
                className={({ isActive }) =>
                  isActive ? "relative text-white lg:border-b lg:pb-1" : null
                }
              >
                MY EVENTS
              </NavLink>
            </li>
            <li className="text-white font-semibold h-16 w-full lg:h-auto lg:w-auto">
              <NavLink
                to="/users"
                onClick={() => setIsNavShowing((oldVal) => false)}
                className={({ isActive }) =>
                  isActive ? "relative text-white lg:border-b lg:pb-1" : null
                }
              >
                USERS
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center">
            {user ? (
              <span className="text-white font-semibold mr-6 capitalize">
                Hi, {user.username || user.name}
              </span>
            ) : null}
            {authed ? (
              <button
                className="text-[--color-gray-light] lg:ring-1 lg:text-white flex items-center gap-2 rounded-lg py-1 px-2 lg:hover:bg-[--accent-color-dark] transition-all duration-200"
                onClick={() => logout()}
              >
                <IoMdExit className="text-3xl lg:text-xl" />
                <span className="text-md font-semibold hidden lg:inline">
                  Log out
                </span>
              </button>
            ) : (
              <div className="flex lg:flex-row gap-6">
                <button
                  className="flex items-center text-md font-semibold gap-1 text-white"
                  onClick={() => setOpenLoginModal(true)}
                >
                  <HiUserCircle className="text-2xl" />
                  Sign In
                </button>
                <button
                  className="border-small-white px-4 py-2 font-semibold rounded-lg text-white hover:bg-[--accent-color-dark] transition-all duration-200"
                  onClick={() => setOpenSignupModal(true)}
                >
                  Sign up
                </button>
              </div>
            )}

            <button
              onClick={() => setIsNavShowing((oldVal) => !oldVal)}
              className="inline-block bg-transparent text-3xl text-white ml-5 lg:hidden"
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

  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmationForm, setShowConfirmationForm] = useState(false);

  const [error, setError] = useState(null);

  const { confirmAccount } = useContext(AuthCtx);

  function onSignup(event) {
    event.preventDefault();

    const attributesData = [
      {
        Name: "name",
        Value: name,
      },
      {
        Name: "custom:title",
        Value: title,
      },
      {
        Name: "custom:department",
        Value: department,
      },
      {
        Name: "custom:delivery_unit",
        Value: deliveryUnit,
      },
    ];

    UserPool.signUp(email, password, attributesData, null, (err, data) => {
      if (err) {
        setError(err.message);
      } else {
        setShowConfirmationForm(true);
        setError(null);
      }
    });
  }

  function onConfirm(event) {
    event.preventDefault();

    confirmAccount(email, confirmationCode)
      .then((data) => {
        if (data === "SUCCESS") {
          setShowConfirmationForm(false);
          setOpenModal(false);
          setConfirmationCode("");
          setEmail("");
          setPassword("");
          setName("");
          setDeliveryUnit("");
          setDepartment("");
          setTitle("");
          setError(null);
          alert("Successfully confirmed, you can now sign in!");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return createPortal(
    <>
      {openModal ? (
        <div className="relative flex item-center justify-center">
          <div
            className="h-screen w-screen fixed top-0 z-20 text-white bg-[--color-black-transparent]"
            onClick={() => {
              setOpenModal(false);
              setError(null);
              setShowConfirmationForm(false);
              setEmail("");
              setPassword("");
              setName("");
              setDeliveryUnit("");
              setDepartment("");
              setTitle("");
              setConfirmationCode(null);
            }}
          />
          <div className="flex fixed z-20 font-semibold h-min flex-col mt-24 bg-white p-10 rounded-lg lg:w-1/2 lg:mx-auto">
            <p className="text-xl lg:text-3xl lg:font-semibold">
              {showConfirmationForm ? "Confirm your account" : "Sign Up"}
            </p>
            {showConfirmationForm ? (
              <>
                <p className="mt-5 text-lg text-[--color-gray-medium]">
                  Check your email for confirmation code and enter it bellow!
                </p>
                <form onSubmit={onConfirm}>
                  <div className="mt-10">
                    <label className="text-md font-medium">
                      Your confirmation code
                    </label>
                    <input
                      required
                      type="text"
                      value={confirmationCode}
                      onChange={(event) =>
                        setConfirmationCode(event.target.value)
                      }
                      maxLength="6"
                      className="input__border block mt-2 text-2xl placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                      placeholder="Enter code here"
                    />
                  </div>
                  {error ? (
                    <p className="text-sm text-red-500 font-light mt-2">
                      {error}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    className="col-span-2 self-center mt-8 text-lg block font-semibold text-white gap-3 py-3 px-6 bg-[--accent-color] rounded-2xl hover:bg-[--accent-color-light] transition-all duration-150"
                  >
                    Confirm your account
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={onSignup}>
                <div className="lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-10">
                  <div className="flex flex-col text-[--accent-color] mt-8">
                    <label className="text-md font-medium">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter full name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                    />
                  </div>

                  <div className="flex flex-col text-[--accent-color] mt-8">
                    <label className="text-md font-medium">Job title</label>
                    <input
                      required
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
                      required
                      type="text"
                      placeholder="Enter your department"
                      value={department}
                      onChange={(event) => setDepartment(event.target.value)}
                      className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                    />
                  </div>
                  <div className="flex flex-col text-[--accent-color] mt-8">
                    <label className="text-md font-medium">Delivery unit</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your delivery unit"
                      value={deliveryUnit}
                      onChange={(event) => setDeliveryUnit(event.target.value)}
                      className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                    />
                  </div>
                  <div className="flex flex-col text-[--accent-color] mt-8">
                    <label className="text-md font-medium">E-mail</label>
                    <input
                      required
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                    />
                  </div>
                  <div className="flex flex-col text-[--accent-color] mt-8">
                    <label className="text-md font-medium">Password</label>
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                    />
                  </div>
                </div>
                {error ? (
                  <p className="text-sm text-red-500 font-light mt-2">
                    {error}
                  </p>
                ) : null}
                <button
                  className="mx-auto col-span-2 self-center mt-8 text-lg block font-semibold text-white gap-3 py-3 px-6 bg-[--accent-color] rounded-2xl hover:bg-[--accent-color-light] transition-all duration-150"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            )}
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
  const { authenticate, setAuthed, setUser } = useContext(AuthCtx);
  const [error, setError] = useState("");
  function onLogin(event) {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        setAuthed(true);
        setUser(data.idToken.payload);
        setOpenModal(false);
        setEmail("");
        setPassword("");
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return createPortal(
    <>
      {openModal ? (
        <div className="relative flex item-center justify-center">
          <div
            className="h-screen w-screen fixed top-0 z-20 text-white bg-[--color-black-transparent]"
            onClick={() => {
              setOpenModal(false);
              setError(null);
              setEmail("");
              setPassword("");
            }}
          />
          <div className="flex fixed z-20 font-semibold h-min flex-col mt-24 bg-white p-10 rounded-lg lg:w-1/2 lg:mx-auto">
            <p className="text-xl lg:text-3xl lg:font-semibold">Sign In</p>
            <form onSubmit={onLogin}>
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">E-mail</label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`${
                    error ? "error__border" : "input__border"
                  }  placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2`}
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-5">
                <label className="text-md font-medium">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className={`${
                    error ? "error__border" : "input__border"
                  }  placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2`}
                />
              </div>
              {error ? (
                <p className="text-sm text-red-500 font-light mt-2">{error}</p>
              ) : null}
              <button
                className="mx-auto col-span-2 self-center mt-8 text-lg block font-semibold text-white gap-3 py-3 px-6 bg-[--accent-color] rounded-2xl hover:bg-[--accent-color-light] transition-all duration-150"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
}
