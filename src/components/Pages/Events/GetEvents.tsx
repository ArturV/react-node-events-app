import axios from "axios";
import { useEffect, useState } from "react";

export const GetEvents = () => {
  const [eventsCard, setEventsCard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const SERV = `http://localhost:3000/events`;

  const getEventsData = async () => {
    try {
      const response = await axios
        .get("/events")
        .then((response) => console.log(response));
      // setEventsCard(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1_00);
  };

  const removeData = (id: any) => {
    const shouldDelete = window.confirm("Are you want to delete?");

    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`http://localhost:3001/events/${id}`)
      .then(() => {
        getEventsData();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="map-card">
          {eventsCard.map((eventList) => (
            <div
              onClick={() => {
                removeData(eventList.idevent);
              }}
              key={eventList.idevent}
              className="events-container"
            >
              <p>ID:{eventList.idevent}</p>
              <p>Name:{eventList.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
