import React, { FormEventHandler, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Autocomplete } from "@mui/material";
import type { TEvent } from "../../Types/types";
import { EventChooser } from "./EventChooser";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

export const AddUser = () => {
  const [userData, setUserData] = useState({
    idevent: null,
    nameAndSurname: "",
    event: "",
    email: "",
    birthDate: "",
    age: null,
  });

  const { exportedEvents } = EventChooser();

  const options = exportedEvents.map((event) => event.name);
  //const options = [...new Set(exportedEvents.map((event) => event.name))];

  const [selected, setSelected] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState("orange");

  const [value, setValue] = React.useState<string | null>(options[0]); // ?
  const [inputValue, setInputValue] = React.useState("");

  const selectionChangeHandler = (event: any) => {
    setSelected(event.target.value);
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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log(userData);
    console.log(selectedFruit);
  };

  const handleSelect = (event: any) => {
    setUserData({
      ...userData,
      //event: event.target.value,
      idevent: event.target.value,
    });
  };

  const handleUserDataChange = (
    value: string,
    key: "email" | "nameAndSurname" | "event" | "birthDate" | "age"
  ) => {
    setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
  };

  //trinti
  const handleChange = (event: any) => {
    setUserData(event.target.value);
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
            id="FullName"
            label="Add Name & Surname"
            name="FullName"
            autoFocus
            aria-required="true"
            value={userData.nameAndSurname}
            onChange={(e) =>
              handleUserDataChange(e.target.value, "nameAndSurname")
            }
          />

          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            //good:  options={[...new Set(exportedEvents.map((event) => event.name))]}
            options={options}
            //options={exportedEvents.map((event) => event.name)}
            // aria-required="true"
            renderInput={(params) => <TextField {...params} label="Events" />}
            // onChange={handleSelect}
          />

          <select
            value={selectedFruit} // ...force the select's value to match the state variable...
            onChange={(e) => setSelectedFruit(e.target.value)} // ... and update the state variable on any change!
          >
            {exportedEvents.map((event) => (
              <option value={event.value}>{event.label}</option>
            ))}
          </select>

          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={exportedEvents.map((event) => event.name)}
            label="even"
            onChange={handleSelect}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select> */}

          {/* <Select
            labelId="simple-select-label"
            value={selected}
            onChange={selectionChangeHandler}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {exportedEvents.map((event) => {
              return <MenuItem value={event.name}>{event.name}</MenuItem>;
            })}
          </Select> */}

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            aria-required="true"
            value={userData.email}
            onChange={(e) => handleUserDataChange(e.target.value, "email")}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="birth"
            label="Date of birth"
            name="birth"
            value={userData.birthDate}
            onChange={(e) => handleUserDataChange(e.target.value, "birthDate")}
          />

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date of birth" value={userData.birthDate} />
          </LocalizationProvider> */}

          <input
            type="date"
            value={userData.birthDate}
            min="1918-01-01"
            onChange={(e) => {
              console.log(e.target.value);
              handleUserDataChange(e.target.value, "birthDate");
            }}
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

  // return (
  //   <form onSubmit={handleFormSubmit}>
  //     <input
  //       type="text"
  //       placeholder="Name & Surname"
  //       value={userData.nameAndSurname}
  //       onChange={(e) => {
  //         handleUserDataChange(e.target.value, "nameAndSurname");
  //       }}
  //     />
  //     <select
  //       name="event"
  //       value={userData.event}
  //       onChange={(e) => {
  //         handleUserDataChange(e.target.value, "event");
  //       }}
  //     >
  //       <option value="a">a</option>
  //       <option value="b">b</option>
  //       <option value="c">c</option>
  //       <option value="d">d</option>
  //     </select>
  //     <input
  //       type="text"
  //       placeholder="Email"
  //       value={userData.email}
  //       onChange={(e) => {
  //         handleUserDataChange(e.target.value, "email");
  //       }}
  //     />
  //     <input
  //       type="date"
  //       value={userData.birthDate}
  //       min="1918-01-01"
  //       onChange={(e) => {
  //         console.log(e.target.value);
  //         handleUserDataChange(e.target.value, "birthDate");
  //       }}
  //     />
  //     <input
  //       type="text"
  //       placeholder="Age"
  //       readOnly
  //       value={calculateAge(userData.birthDate)}
  //     />

  //     <button>Submit</button>
  //   </form>
  // );
};
