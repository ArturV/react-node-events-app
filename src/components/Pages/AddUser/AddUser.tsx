import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormEventHandler, useState } from "react";
import { EventChooser } from "./EventChooser";
import { useNavigate } from "react-router-dom";
import "../../../index.css";

export const AddUser = () => {
  const [userData, setUserData] = useState<any>({
    idevent: null,
    nameAndSurname: "",
    event: "",
    email: "",
    birthDate: "",
  });

  const navigate = useNavigate();
  const { exportedEvents } = EventChooser();
  const resetInput = () => {
    setUserData("");
  };

  const handleInputChange = (e: any) => {
    let initUser = { ...userData, [e.target.name]: e.target.value };

    if (e.target.name === "events") {
      const idevent = Array.from(e.target.selectedOptions).map((option: any) =>
        parseInt(option.value)
      );

      const getID = +initUser.events;
      const foundEventNameByID = exportedEvents.filter(function (obj) {
        return obj.idevent == getID;
      })[0];

      delete initUser.events;
      initUser = { ...initUser, idevent: idevent };
      initUser = { ...initUser, event: foundEventNameByID.name };
    }

    setUserData(initUser);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e: any) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/add-user",

        {
          fullname: userData.nameAndSurname,
          event: userData.event,
          idevent: userData.idevent,
          email: userData.email,
          birthdate: userData.birthDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        alert(`User added`);
        resetInput();
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateAge = (birthDate: string): number => {
    if (!birthDate || birthDate === "") {
      return 0;
    } else {
      let today = new Date();
      let birthDayConverted = new Date(birthDate);
      let age = today.getFullYear() - birthDayConverted.getFullYear();
      const month = today.getMonth() - birthDayConverted.getMonth();

      if (
        month < 0 ||
        (month === 0 && today.getDate() < birthDayConverted.getDate())
      ) {
        age--;
      }

      return age;
    }
  };

  return (
    <>
      <Typography height="40px" variant="h4" sx={{ m: 4 }}>
        Add User to Event
      </Typography>
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Add Name & Surname"
            name="nameAndSurname"
            autoFocus
            aria-required="true"
            value={userData.nameAndSurname}
            onChange={handleInputChange}
          />

          <select name="events" id="event-choice" onChange={handleInputChange}>
            {exportedEvents.map((event, idevent) => (
              <option key={idevent} value={event.idevent}>
                {event.name}
              </option>
            ))}
          </select>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type={"email"}
            label="Email"
            name="email"
            aria-required="true"
            value={userData.email}
            onChange={handleInputChange}
          />

          <input
            type="date"
            id="date-chooser"
            name="birthDate"
            value={userData.birthDate}
            min="1918-01-01"
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            aria-readonly="true"
            fullWidth
            id="age"
            label="User age"
            name="age"
            InputProps={{
              readOnly: true,
            }}
            value={calculateAge(userData.birthDate)}
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Container>
    </>
  );
};
