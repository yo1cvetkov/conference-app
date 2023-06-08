import React, { useState } from "react";
import { UserDetails } from "../pages/Users/Users";

export default function User({ confUser }) {
  const [openUserDetails, setOpenUserDetails] = useState(false);

  return (
    <>
      <UserDetails
        openModal={openUserDetails}
        setOpenModal={setOpenUserDetails}
        name={confUser.name}
        title={confUser.title}
        department={confUser.department}
        deliveryUnit={confUser.deliveryUnit}
        myEvents={confUser.myEvents}
      />
      <div
        className="py-10 px-10 text-center rounded-2xl shadow-lg gap-4 cursor-pointer ring-1 ring-[--color-gray-light-transparent]"
        onClick={() => setOpenUserDetails(true)}
      >
        <h3 className="font-bold text-2xl">{confUser.name}</h3>
        <p className="font-bold text-[--color-gray-dark]">{confUser.title}</p>
        <p>{confUser.department}</p>
        <p>{confUser.deliveryUnit}</p>
      </div>
    </>
  );
}
