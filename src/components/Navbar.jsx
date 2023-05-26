import "./navbar.css"
import { useState } from "react"
import Logo from "../assets/Logo.png"
import {Link, NavLink} from "react-router-dom"
import {links} from "../data"
import {GoThreeBars} from "react-icons/go"


export default function Navbar(){
    const [isNavShowing, setIsNavShowing] = useState(false);

    return (
        <nav>
            <div className="container nav__container">
                <div className="logo__div">
                <p className="text-2xl text-white">Conference</p>
                <Link to="/" className="link">
                    <img src={Logo} alt="Nav Logo" className="h-10"/>
                </Link>
                </div>
                <ul className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}>
                    {links.map((obj, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={obj.path} onClick={() => setIsNavShowing(oldVal => false)} className={({isActive}) => isActive ? "active-nav" : ""}>{obj.name}</NavLink>
                            </li>
                        )
                    })}
                </ul>
                <div className="end__point">
                    <Link to='/sign_in'>
                        <p>Sign in</p>
                    </Link>
                <button onClick={() => setIsNavShowing(oldVal => !oldVal)} className="nav__toggle-btn">
                    <GoThreeBars />
                </button>
                </div>
            </div>
        </nav>
    )
}