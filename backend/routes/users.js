import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { MYSQL_CONFIG, jwtSecret } from "../src/config.js";

export const addUserToEvent = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const choosedEventId = +req.body?.idevent;
  const choosedEvent = req.body?.event;
  const inputFullname = req.body?.fullname;
  const inputEmail = req.body?.email;
  const inputBirthday = req.body?.birthdate;
  const inputAge = +req.body?.age;

  console.log("idevent", choosedEventId);
  console.log("event", choosedEvent);
  console.log("name", inputFullname);
  console.log("mail", inputEmail);
  console.log("bday", inputBirthday);

  let payload = null;

  if (!accessToken) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(accessToken, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  if (!choosedEventId || choosedEventId < 0) {
    console.log(choosedEventId);
    return res
      .status(402)
      .send({ error: "Please input correct event id!" })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [isUserInEvent] = await con.execute(
      `SELECT idevent, email FROM users
  WHERE email='${inputEmail}' AND event=${choosedEventId} ;`
    );

    await con.end();

    if (Array.isArray(isUserInEvent) && isUserInEvent.length === 0) {
      try {
        const con = await mysql.createConnection(MYSQL_CONFIG);
        const [result] = await con.execute(
          `INSERT INTO users (idevent, event, fullname, email, birthdate) VALUES ('${choosedEventId}','${choosedEvent}','${inputFullname}','${inputEmail}','${inputBirthday}')`
        );

        await con.end();

        return res.status(200).send(result).end();
      } catch (error) {
        res.status(500).send(error).end();
      }
    } else {
      return res
        .status(400)
        .send({ error: "Error! This user already exists in this event" })
        .end();
    }
  } catch (error) {
    res.status(500).send(error).end();

    return console.error(error);
  }
};

export const deleteUser = async (req, res) => {
  const iduser = +req.params.iduser;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [result] = await con.execute(
      `DELETE FROM users WHERE iduser=${iduser}`
    );

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

// export const getUserEvents = async (req, res) => {
//   const accessToken = req.headers.authorization?.split(" ")[1];

//   let payload = null;

//   if (!accessToken) {
//     return res.status(401).send({ error: "User unauthorised" }).end();
//   }

//   try {
//     payload = jwt.verify(accessToken, jwtSecret);
//   } catch (err) {
//     if (err instanceof jwt.JsonWebTokenError) {
//       return res.status(401).send({ error: "User unauthorised" }).end();
//     }

//     return res.status(400).end();
//   }

//   try {
//     const con = await mysql.createConnection(MYSQL_CONFIG);

//     const query = `SELECT events.idevent, events.name, users.fullname, users.email, users.birthdate FROM events INNER JOIN users ON users.iduser = events.iduser`;
//     const [result] = await con.execute(query);
//     console.log({ result });

//     await con.end();

//     return res.status(200).send(result).end();
//   } catch (error) {
//     res.status(500).send(error).end();
//     return console.error(error);
//   }
// };

export const getUsers = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  let payload = null;

  if (!accessToken) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(accessToken, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [result] = await con.execute("SELECT * FROM users");

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const getUserbyId = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const iduser = +req.params.iduser;

  let payload = null;

  if (!accessToken) {
    return res.status(401).send({ error: "User unauthorised" }).end();
  }

  try {
    payload = jwt.verify(accessToken, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }
    return res.status(400).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [result] = await con.execute(
      `SELECT * FROM users WHERE iduser=${iduser}`
    );

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};
