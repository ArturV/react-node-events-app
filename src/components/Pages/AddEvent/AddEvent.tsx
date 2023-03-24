import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const AddEvent = () => {
  const [newEvent, setNewEvent] = useState("");

  const resetInput = () => {
    setNewEvent("");
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    try {
      axios
        .post(
          "http://localhost:5000/add-event",
          {
            name: newEvent,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(() => {
          alert(`Event added`);
          resetInput();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Typography height="40px" variant="h4" sx={{ m: 4 }}>
        Add Event
      </Typography>
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="event"
            label="Add Event"
            name="event"
            autoFocus
            aria-required="true"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
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
