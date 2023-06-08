import { useParams } from "react-router-dom";
import noImg from "../../assets/noImg.jpg";
import { FaUser } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { BiEdit, BiMessage } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleConference } from "../../utils/getSingleConference";
import { technologiesData } from "../../utils/technologiesData";
import Skeleton from "react-loading-skeleton";
import { HiPlus } from "react-icons/hi";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { AuthCtx } from "../../context/AuthCtx";
import { attendConference } from "../../utils/attendConference";
import { cancelAttendance } from "../../utils/cancelAttendance";
import { FcCancel } from "react-icons/fc";
import { EditConfModal } from "../../components/Conference";

export default function SingleConference() {
  const [showEditConf, setShowEditConf] = useState(false);

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user, authed } = useContext(AuthCtx);

  const { data, isLoading } = useQuery({
    queryKey: ["conference", id],
    queryFn: () => getSingleConference(id),
  });

  const userId = user && user.sub;

  const myEvents = queryClient.getQueryData(["my-events", userId]);

  const isAttending =
    data && user && data.attenders.find((attender) => attender.id === user.sub)
      ? true
      : false;

  const cancelBody = data &&
    user &&
    myEvents && {
      userId: user.sub,
      conferenceAttenders: data.attenders
        .filter((attender) => attender.id !== user.sub)
        .map((att) => {
          return {
            name: att.name,
            userId: att.id,
            title: att.title,
            email: att.email,
            department: att.department,
            deliveryUnit: att.deliveryUnit,
          };
        }),
      myEvents: myEvents.filter((event) => event.id !== id),
    };

  const userBody = user &&
    data && {
      userId: user.sub,
      name: user.name,
      userTitle: user["custom:title"],
      department: user["custom:department"],
      deliveryUnit: user["custom:delivery_unit"],
      email: user.email,
      creatorId: data.creatorId,
      startTime: data.startTime,
      endTime: data.endTime,
      startDate: data.startDate,
      title: data.title,
      technologies: data.technologies,
    };

  const attendMutation = useMutation({
    mutationFn: () => attendConference(id, userBody),
    onSuccess: () => {
      queryClient.invalidateQueries("conference", id);
      queryClient.invalidateQueries("my-events", userId);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelAttendance(id, cancelBody),
    onSuccess: () => {
      queryClient.invalidateQueries("conference", id);
      queryClient.invalidateQueries("my-events", userId);
    },
  });

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
    const month = splittedDate[1] - 1;
    const day = splittedDate[2];

    const newDate = new Date(year, month, day);
    formattedStartDate = format(newDate, "dd MMMM yyyy");

    const splittedEndDate = data.endDate.split("-");
    const endYear = splittedEndDate[0];
    const endMonth = splittedEndDate[1] - 1;
    const endDay = splittedDate[2];

    const newEndDate = new Date(endYear, endMonth, endDay);
    formattedEndDate = format(newEndDate, "dd MMMM yyyy");
  }

  const isCreator = user?.sub === data?.creatorId ? true : false;

  return (
    <section className="container my-40">
      {data && (
        <EditConfModal
          confTitle={data.title}
          startDate={data.startDate}
          endDate={data.endDate}
          startTime={data.startTime}
          endTime={data.endTime}
          url={data.url}
          description={data.description}
          technologies={data.technologies}
          open={showEditConf}
          setOpen={setShowEditConf}
        />
      )}
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
              {authed && isCreator ? (
                <button
                  onClick={() => setShowEditConf(true)}
                  className="flex items-center self-center justify-self-center gap-4 text-[--color-gray-dark]"
                >
                  <BiEdit className="text-xl" />
                  <p className="text-xl font-semibold">Edit</p>
                </button>
              ) : null}
              {authed ? (
                isAttending ? (
                  <button
                    className="flex items-center self-center justify-self-center px-4 py-2 rounded-lg gap-6 ring-1 ring-[--color-gray-light-transparent] transition-all duration-200 hover:bg-[--color-gray-light-transparent]"
                    onClick={cancelMutation.mutate}
                  >
                    <FcCancel className="text-xl" />
                    <span className="text-lg">
                      {cancelMutation.isLoading
                        ? "Cancelling..."
                        : "Cancel attendance"}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={attendMutation.mutate}
                    className="self-center flex items-center justify-self-center px-4 py-2 rounded-lg gap-6 bg-[--accent-color]"
                  >
                    <HiPlus className="text-white" />
                    <span className="text-lg font-semibold text-white">
                      {attendMutation.isLoading ? "Attending..." : "Attend"}
                    </span>
                  </button>
                )
              ) : null}
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-xl text-[--accent-color] font-semibold">
              Attenders:
            </h2>
          </div>
          <div className="flex gap-8 items-center mt-10">
            {data.attenders &&
              data.attenders.map((attender) => {
                if (attender.name) {
                  return (
                    <div
                      className="flex gap-4 items-center p-4 rounded-2xl shadow-xl ring-1 ring-[--color-gray-light-transparent]"
                      key={attender.id}
                    >
                      <FaUser />
                      <p>{attender.name}</p>
                    </div>
                  );
                }
              })}
          </div>
        </>
      )}
    </section>
  );
}
