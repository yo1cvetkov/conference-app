import "./navbar.css";
import { useState, useEffect, createContext, useContext } from "react";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data";
import { GoThreeBars } from "react-icons/go";
import {HiUserCircle} from "react-icons/hi"
import { createPortal } from "react-dom";
import "./SignInModal.css";
import { resetUserSession, setUserSession } from "../service/AuthService";
import axios from "axios";
import {getUser} from "../service/AuthService";
import { LoggedContext } from "../AuthContext";




export default function Navbar() {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const user = getUser();
  const name = user !== 'undefined' && user ? user.username : "";
  const loggedC = useContext(LoggedContext);


  useEffect(()=>{
    getUser() !== null ? loggedC.setLogged(true) : loggedC.setLogged(false);
  }, [openModal])
  


  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
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
              return ( obj.name === "REGISTER" && !loggedC.logged || obj.name !== "REGISTER" ?
                <li key={index}>
                  <NavLink
                    to={obj.path}
                    onClick={() => setIsNavShowing((oldVal) => false)}
                    className={({ isActive }) => (isActive ? "active-nav" : "")}
                  >
                    {obj.name}
                  </NavLink>
                </li> : null
              );
            })}
          </ul>
          <div className="end__point">
            {loggedC.logged === false ? (
              <button className="sign__in-btn" onClick={() => setOpenModal(true)}>
              <HiUserCircle />
              Sign in</button>
            ) : <div className="end__point">
            <input className="btn btn__input mx-auto" type="button" value={`${name}, Sign out`} onClick={loggedC.logOutHandler} />
            </div>
            }
            
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

export function Modal({ openModal, setOpenModal}) {
    const loginUrl = 'https://a7wght99zk.execute-api.eu-central-1.amazonaws.com/test/login'

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const loginHandler = (event) => {
      event.preventDefault();
      if(username.trim() === '' || password.trim()===""){
        setErrorMessage('Username and passwords are both required');
      }
      setErrorMessage(null);
      const requestConfig = {
        headers: {
          'x-api-key': 'qCN51M0Zbs5FRo0r8IdHt90raGmJYSlP3FUsX1jo'
        }
      }

      const requestBody = {
        username: username,
        password: password
      }

      axios.post(loginUrl, requestBody, requestConfig).then(response => {
        setUserSession(response.data.user, response.data.token);
        setOpenModal(false);
      }).catch((error)=>{
        if(error.response.status === 401 || error.response.status === 403) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Sorry backend failed');
        }
      })
    }


  return createPortal(
    <>
      {openModal ? ( 
        <div className="relative flex item-center justify-center">
          <div className="sign-in__modal" onClick={() => setOpenModal(false)} />
          <div className="flex fixed z-20 font-semibold h-min flex-col mt-24 bg-white p-10 rounded-lg lg:w-1/2 lg:mx-auto">
            <p className="text-xl lg:text-3xl lg:font-semibold">Sign In</p>
            <form onSubmit={loginHandler}>
              <div className="flex flex-col text-[--accent-color] mt-8">
                <label className="text-md font-medium">Username</label>
                <input
                  type="text"
                  id="username_input"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  placeholder="Enter your username"
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <div className="flex flex-col text-[--accent-color] mt-5">
                <label className="text-md font-medium">Password</label>
                <input
                  type="password"
                  id="password_input"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="input__border placeholder:text-[--color-gray-light] focus:ring focus:ring-[--color-gray-light-transparent] px-3 py-1 rounded-lg lg:py-2"
                />
              </div>
              <input className="btn btn__input2 mt-5 mx-auto" type="submit" value="Sign in"/>
            </form>
            <div className="text-2xl text-red-700">{errorMessage}</div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
}
