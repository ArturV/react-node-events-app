import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import auth from "../routes/auth.js";
import { createNewEvent, getEvents, getEventbyId } from "../routes/events.js";
import {
  addUserToEvent,
  getUserEvents,
  getUsers,
  getUserbyId,
} from "../routes/users.js";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/auth/", auth);

app.get("/events", getEvents);
app.post("/add-event", createNewEvent);
app.post("/add-user", addUserToEvent);
app.get("/user-events", getUserEvents);
app.get("/users", getUsers);

app.get("/events/:event_id", getEventbyId);
app.get("/users/:user_id", getUserbyId);

app.get("/", (_, res) => {
  res.send({ msg: "Server running healthy" });
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
