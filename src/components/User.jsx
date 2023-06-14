import React from "react";
import "./user.css";

function User(props) {
  const { name, title, dep, del, attendedConferences } = props;
  return (
    <div
      className="user__div cursor-pointer"
      onClick={() =>{
        props.setOpenUserDetails(true)
        props.info(props);
      }}
    >
      <h3>{name}</h3>
      <p className="p__user__desc">{title}</p>
      <p>{dep}</p>
      <p>{del}</p>
    </div>
  );
}

export default User;
