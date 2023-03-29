import axios from "axios";
import { useEffect, useState } from "react";
import type { TEvent } from "../../Types/types";

export const EventChooser = () => {
  const [exportedEvents, setExportedEvents] = useState<TEvent[]>([]);

  const getEvents = () => {
    axios
      .get("http://localhost:5000/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setExportedEvents(
            res.data.filter((exportedEvents: TEvent) => exportedEvents.name)
          );
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getEvents();
  }, []);

  return { exportedEvents };
};
