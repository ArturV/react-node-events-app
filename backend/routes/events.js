import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { MYSQL_CONFIG, jwtSecret } from "../src/config.js";

export const getEvents = async (req, res) => {
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
    const [result] = await con.execute("SELECT * FROM events");

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const getEventbyId = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const idevent = +req.params.idevent;

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
      `SELECT * FROM events WHERE idevent=${idevent}`
    );

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const createNewEvent = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const id = req.body?.id?.trim();
  const name = req.body?.name;

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

  //here
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [isEventInMysql] = await con.execute(
      `SELECT name FROM events
  WHERE name='${name}' ;`
    );

    await con.end();

    if (Array.isArray(isEventInMysql) && isEventInMysql.length === 0) {
      try {
        const con = await mysql.createConnection(MYSQL_CONFIG);
        const [result] = await con.execute(
          `INSERT INTO events (idevent, name) VALUES ('${id}','${name}')`
        );

        await con.end();

        return res.status(200).send(result).end();
      } catch (error) {
        res.status(500).send(error).end();
      }
    } else {
      return res
        .status(400)
        .send({ error: "Error! This event already exists" })
        .end();
    }
  } catch (error) {
    res.status(500).send(error).end();

    return console.error(error);
  }
};

//   try {
//     const con = await mysql.createConnection(MYSQL_CONFIG);
//     const [result] = await con.execute(
//       `INSERT INTO events (idevent, name) VALUES ('${id}','${name}')`
//     );

//     await con.end();

//     return res.status(200).send(result).end();
//   } catch (error) {
//     res.status(500).send(error).end();
//     return console.error(error);
//   }
// };

export const deleteEvent = async (req, res) => {
  const idevent = +req.params.idevent;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [result] = await con.execute(
      `DELETE FROM events WHERE idevent=${idevent}`
    );

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};

export const getEventUsers = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const idevent = +req.params.idevent;

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
      // `SELECT events.idevent, events.name, users.fullname FROM events INNER JOIN users ON users.idevent = events.idevent AND users.idevent = ${idevent}`
      `SELECT users.birthdate, users.email, users.fullname, events.name FROM events INNER JOIN users ON users.idevent = events.idevent AND users.idevent = ${idevent}`
    );

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};
