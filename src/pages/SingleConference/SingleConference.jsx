import { useParams } from "react-router-dom";
import noImg from "../../assets/noImg.jpg";
import { FaUser } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleConference } from "../../utils/getSingleConference";
import { technologiesData } from "../../utils/technologiesData";
import Skeleton from "react-loading-skeleton";
import { HiPlus } from "react-icons/hi";
import { format } from "date-fns";

export default function SingleConference() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["conference", id],
    queryFn: () => getSingleConference(id),
  });

  console.log(data);

  let filteredTechnologies = [];

  if (data) {
    const normalizedTechnologies = data.technologies.map((technology) =>
      technology.trim().toLowerCase()
    );

    for (let i = 0; i < normalizedTechnologies.length; i++) {
      let singleTech = normalizedTechnologies[i];

      const foundObj = technologiesData.find(
        (obj) => obj.technology === singleTech
      );

      filteredTechnologies.push(foundObj);
    }
  }

  let formattedStartDate;
  let formattedEndDate;

  if (data) {
    const splittedDate = data.startDate.split("-");
    const year = splittedDate[0];
    const month = splittedDate[1];
    const day = splittedDate[2];

    const newDate = new Date(year, month, day);
    formattedStartDate = format(newDate, "dd MMMM yyyy");

    const splittedEndDate = data.endDate.split("-");
    const endYear = splittedEndDate[0];
    const endMonth = splittedEndDate[1];
    const endDay = splittedDate[2];

    const newEndDate = new Date(endYear, endMonth, endDay);
    formattedEndDate = format(newEndDate, "dd MMMM yyyy");
  }

  return (
    <section className="container my-40">
      {isLoading ? (
        <div className="grid grid-cols-3 gap-10 mt-20">
          <Skeleton className="col-start-1 col-end-2 h-72" />
          <Skeleton count={5} className="col-start-2 col-end-3 mb-5 h-10" />
          <Skeleton className="col-start-3 col-end-4 h-52" />
          <Skeleton className="col-start-3 col-end-4 h-8" />
        </div>
      ) : (
        <>
          <h2 className="mb-8 text-3xl font-bold text-[--accent-color]">
            {data.title}
          </h2>
          <div className="grid grid-cols-1 mt-12 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
            <img src={noImg} alt="No-image" className="rounded-2xl" />
            <div className="grid grid-cols-2 items-center gap-8">
              <div className="flex items-center gap-4">
                <BsCalendar3 className="text-[--color-gray-dark] text-xl" />
                <p className="font-semibold text-[--color-gray-dark]">
                  Start date
                </p>
              </div>
              <p className="text-[--accent-color-light] font-medium">
                {formattedStartDate}
              </p>

              <div className="flex items-center gap-4">
                <BsCalendar3 className="text-[--color-gray-dark] text-xl" />
                <p className="font-semibold text-[--color-gray-dark]">
                  End Date:
                </p>
              </div>
              <p className="text-[--accent-color-light] font-medium">
                {formattedEndDate}
              </p>

              <div className="flex items-center gap-4">
                <BsFillClockFill className="text-[--color-gray-dark] text-xl" />
                <p className="font-semibold text-[--color-gray-dark]">Time:</p>
              </div>
              <p className="text-[--accent-color-light] font-medium">
                {data.startTime}h - {data.endTime}h
              </p>

              <div className="flex items-center gap-4">
                <FaUser className="text-[--color-gray-dark] text-xl" />
                <p className="font-semibold text-[--color-gray-dark]">
                  Creator Id:
                </p>
              </div>
              <p className="text-[--accent-color-light] font-medium">
                {data.creatorId}
              </p>

              <div className="flex items-center gap-4">
                <BiMessage className="text-[--color-gray-dark] text-xl" />
                <p className="font-semibold text-[--color-gray-dark]">
                  Description:
                </p>
              </div>
              <p className="text-[--accent-color-light] font-medium">
                {data.description}
              </p>
            </div>

            <div className="grid grid-cols-1">
              <div className="self-start justify-self-center">
                <p className="text-lg text-center font-semibold text-[--accent-color]">
                  Technologies
                </p>
                <div className="flex items-center gap-10 mt-8">
                  {filteredTechnologies.map((techObj) => (
                    <img
                      key={techObj.id}
                      className="w-10 h-10"
                      src={techObj.icon}
                    />
                  ))}
                </div>
              </div>
              <Link
                to="/id"
                className="self-center flex items-center justify-self-center px-4 py-2 rounded-lg gap-6 bg-[--accent-color]"
              >
                <HiPlus className="text-white" />
                <span className="text-lg font-semibold text-white">Attend</span>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-xl text-[--accent-color] font-semibold">
              Attenders:
            </h2>
          </div>
          <div className="flex gap-8 items-center mt-10">
            {data.attenders ? (
              data.attenders.map((attender) => {
                return (
                  <div
                    className="flex gap-4 items-center p-4 rounded-2xl shadow-xl ring-1 ring-[--color-gray-light-transparent]"
                    key={attender.id}
                  >
                    <FaUser />
                    <p>{attender.name}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-lg mt-12 mx-auto text-[--color-gray-medium]">
                There are no attenders for this event
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
