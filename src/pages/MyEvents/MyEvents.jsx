import React, { useContext } from "react";
import { conferenceData } from "../../conferenceData.js";
import Conference from "../../components/Conference.jsx";
import { useQuery } from "@tanstack/react-query";
import Sketch from "../../assets/sketch.png";
import "./MyEvents.css";
import { AuthCtx } from "../../context/AuthCtx.jsx";
import { getMyEvents } from "../../utils/getMyEvents.js";
import { useParams } from "react-router-dom";

function MyEvents() {
  const { user } = useContext(AuthCtx);

  const { id } = useParams();

  const myEventsQuery = useQuery({
    queryKey: ["my-events", id],
    queryFn: () => getMyEvents(id),
  });

  return (
    <section className="container my-40">
      <h2 className="my__events__title">My Events</h2>
      <div className="my__events__container">
        <div className="conference__container">
          {user && myEventsQuery.isLoading ? (
            <div>Loading...</div>
          ) : (
            myEventsQuery.data?.map((conference) => {
              return (
                <Conference
                  key={conference.id}
                  id={conference.id}
                  name={conference.title}
                  date={conference.startDate}
                  startTime={conference.startTime}
                  endTime={conference.endTime}
                  technologies={conference.technologies}
                  isShow={true}
                  creatorId={conference.creatorId}
                />
              );
            })
          )}
        </div>
        <div className="my__add__container">
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

export default MyEvents;
