import React from "react";
import "./user.css";

function User({ id, name, desc, dep, del }) {
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
