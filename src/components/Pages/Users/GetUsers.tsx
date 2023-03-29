import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { TUser } from "../../Types/";

export const GetUsers = () => {
  const [usersCards, setUsersCards] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios
        .get("http://localhost:5000/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            setUsersCards(res.data);
          }
        });
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1_00);
  };

  const handleClickToRemove = (id: number) => {
    const shouldDelete = window.confirm("Are you want to delete?");

    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Typography height="40px" variant="h4" sx={{ m: 4 }}>
        Users in Events
      </Typography>

      <IconButton size="small" sx={{ ml: 2 }}>
        {
          <Link to={`/add-user`}>
            <AddCircleIcon />
          </Link>
        }
      </IconButton>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Event</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersCards.map((userCard) => (
            <TableRow key={userCard.iduser}>
              <TableCell>{userCard.fullname}</TableCell>
              <TableCell>{userCard.email}</TableCell>
              <TableCell>{userCard.birthdate}</TableCell>
              <TableCell>{userCard.event}</TableCell>
              <TableCell
                align="right"
                onClick={() => handleClickToRemove(userCard.iduser)}
              >
                <IconButton size="small" sx={{ ml: 2 }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
