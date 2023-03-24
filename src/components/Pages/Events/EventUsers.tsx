import axios from "axios";
import type { TEvent, TUserEvent } from "../../Types/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const EventUsers = () => {
  const [eventsCard, setEventsCard] = useState<TUserEvent[]>([]);

  const url = window.location.pathname;
  const parts = url.split("/");
  const numberString = parts[2];
  const number = parseInt(numberString);

  const getUsersInEvent = (id: number) => {
    try {
      axios
        .get(`http://localhost:5000/event-users/${id}`, {
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
  };

  //   useEffect(() => {
  // }, []);

  getUsersInEvent(number);
  return (
    <>
      <Typography height="40px" variant="h4" sx={{ m: 4 }}>
        Event Users
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Birthdate</TableCell>
            <TableCell align="right">Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventsCard.map((eventList) => (
            <TableRow key={eventList.iduser}>
              <TableCell>{eventList.fullname}</TableCell>
              <TableCell>{eventList.email}</TableCell>
              <TableCell> {eventList.birthdate}</TableCell>

              <TableCell align="right">
                {eventList.name}
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
};
