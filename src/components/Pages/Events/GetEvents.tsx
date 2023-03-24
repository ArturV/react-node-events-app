import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
//import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { TEvent } from "../../Types/types";
//import { IconButton, Stack } from "@mui/material";
import { Settings, Info, ContentCopy, Favorite } from "@mui/icons-material";

// export type TEvent = {
//   idevent: number;
//   name: string | null;
//   iduser: number;
//   users: string | null;
// };

export const GetEvents = () => {
  const [eventsCard, setEventsCard] = useState<TEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEventsData = async () => {
    try {
      const response = await axios
        .get("http://localhost:5000/events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            setEventsCard(res.data);
          }
        });
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1_00);
  };

  const removeData = (id: number) => {
    const shouldDelete = window.confirm("Are you want to delete?");

    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`http://localhost:5000/events/${id}`)
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
      <Typography height="40px" variant="h4" sx={{ m: 4 }}>
        Events
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell>Registrations</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventsCard.map((eventList) => (
            <TableRow key={eventList.idevent}>
              <TableCell>
                <Link to={`/event-users/${eventList.idevent}`}>
                  {eventList.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/event-users/${eventList.idevent}`}>Show users</Link>
              </TableCell>

              <TableCell align="right">
                <button onClick={() => removeData(eventList.idevent)}>
                  Delete
                </button>

                {/* <IconButton size="small" sx={{ ml: 2 }}>
                  <DeleteIcon />
                </IconButton> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

  // return (
  //   <>
  //     {isLoading ? (
  //       <p>Loading</p>
  //     ) : (
  //       <div className="map-card">
  //         {eventsCard.map((eventList) => (
  //           <div
  //             onClick={() => {
  //               removeData(eventList.idevent);
  //             }}
  //             key={eventList.idevent}
  //             className="events-container"
  //           >
  //             <p>ID:{eventList.idevent}</p>
  //             <p>Name:{eventList.name}</p>
  //             <p>Id user:{eventList.iduser}</p>
  //             <p>User:{eventList.users}</p>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </>
  // );
};
