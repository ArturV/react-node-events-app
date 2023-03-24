import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

export type TUser = {
  iduser: number;
  fullname: string | null;
  event: string | null;
  idevent: number;
  email: string | null;
  age: number;
  birthdate: string | null;
};

export const GetUsers = () => {
  const [usersCards, setUsersCards] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const SERV = `http://localhost:5000/users`;

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

  const handleClick = (id: number) => {
    const shouldDelete = window.confirm("Are you want to delete?");

    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => console.error(error));
  };

  //const removeData: React.FormEventHandler<HTMLFormElement> = async (e) => {
  //e.preventDefault();
  const removeData = (id: number) => {
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
              <TableCell align="right">
                <button onClick={() => removeData(userCard.iduser)}>
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

  // <>
  //   {isLoading ? (
  //     <p>Loading</p>
  //   ) : (
  //     <div className="users-card">
  //       {usersCards.map((userCard) => (
  //         <div
  //           onClick={() => {
  //             removeData(userCard.iduser);
  //           }}
  //           key={userCard.iduser}
  //           className="users-container"
  //         >
  //           <p>ID:{userCard.iduser}</p>
  //           <p>Name Surname:{userCard.fullname}</p>
  //           <p>Event:{userCard.event}</p>
  //           <p>Event id:{userCard.idevent}</p>
  //           <p>Email:{userCard.email}</p>
  //           <p>Age:{userCard.age}</p>
  //           <p>Birthdate:{userCard.birthdate}</p>
  //         </div>
  //       ))}
  //     </div>
  //   )}
  // </>
};
