import React, { useContext } from "react";
import Conference from "../../components/Conference.jsx";
import { useQueryClient } from "@tanstack/react-query";
import Sketch from "../../assets/sketch.png";
import { AuthCtx } from "../../context/AuthCtx.jsx";
import { useParams } from "react-router-dom";

function MyEvents() {
  const { user, authed } = useContext(AuthCtx);

  const { id } = useParams();

  const queryClient = useQueryClient();

  const myEvents = queryClient.getQueryData(["my-events", id]);

  // console.log(myEvents);

  return (
    <section className="container my-40">
      <h2 className="font-bold text-3xl mb-8 text-[--accent-color]">
        My Events
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="col-start-1 col-end-4 flex flex-col gap-8">
          {!authed ? (
            <div className="text-xl text-[--color-gray-medium] font-semibold">
              You are not logged in
            </div>
          ) : authed && myEvents ? (
            myEvents.map((conference) => {
              if (conference.startTime === "") return;
              return (
                <Conference
                  key={conference.id}
                  id={conference.id}
                  name={conference.confTitle}
                  startDate={conference.startDate}
                  startTime={conference.startTime}
                  endTime={conference.endTime}
                  technologies={conference.technologies}
                  isInMyEvents={true}
                  creatorId={conference.creatorId}
                />
              );
            })
          ) : null}
        </div>
        <div>
          <div className="pb-1">
            <h2 className="px-9 font-semibold text-2xl">
              Make sure that you're signed in before attending an event!
            </h2>
            <img src={Sketch} alt="enjoy" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyEvents;
