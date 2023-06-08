import React, { useContext, useState } from "react";
import User from "../../components/User.jsx";
import Sketch from "../../assets/sketch.png";
import "./Users.css";
import { DataContext } from "../../DataContext.jsx";
import { UserDetailsModal } from "../../modals/UserDetailsModal.jsx";

function Users() {
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [eventHandle, setEventHandle] = useState('');
  const userData = useContext(DataContext).users;
  if(!userData) return <div>Loading...</div>

  return (
    <section className="container">
      <UserDetailsModal
        openModal={openUserDetails}
        setOpenModal={setOpenUserDetails}
        info={eventHandle}
      />
      <h2>Users</h2>
      <div className="users__container">
        <div className="user__info__container">
          {userData.map((obj, i) => {
            return <User key={i} id={i} name={obj.name} title={obj.title} dep={obj.department} del={obj.deployment} attends={obj.attends} setOpenUserDetails={setOpenUserDetails} info={setEventHandle}/>
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