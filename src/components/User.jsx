import React from "react";
import "./user.css";

function User(props) {
  const { id, name, desc, dep, del } = props;
  return (
    <div
      className="user__div cursor-pointer"
      onClick={() => props.setOpenUserDetails(true)}
    >
      <h3>{name}</h3>
      <p className="p__user__desc">{desc}</p>
      <p>{dep}</p>
      <p>{del}</p>
    </div>
  );
}

export default User;
