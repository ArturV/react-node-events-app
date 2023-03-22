import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { MYSQL_CONFIG, jwtSecret } from "../src/config.js";

export const addUserToEvent = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const idevent = +req.body?.id?.trim();

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

  if (!idevent || idevent < 0) {
    return res
      .status(402)
      .send({ error: "Please input correct group id!" })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [isUserInEvent] = await con.execute(
      `SELECT idevent , iduser 
    FROM events 
    WHERE iduser= ${payload.id} AND idevent=${idevent} ;`
    );

    await con.end();

    if (Array.isArray(isUserInEvent) && isUserInEvent.length === 0) {
      try {
        const con = await mysql.createConnection(MYSQL_CONFIG);
        const [result] = await con.execute(
          `INSERT INTO events (idevent, iduser) VALUES ('${idevent}','${payload.id}')`
        );

        await con.end();

        return res.status(200).send(result).end();
      } catch (error) {
        res.res.status(500).send(error).end();
      }
    } else {
      return res
        .status(400)
        .send({ error: "Error! This user already exists in this group" })
        .end();
    }
  } catch (error) {
    res.status(500).send(error).end();

    return console.error(error);
  }
};

export const userEvents = async (req, res) => {
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

    const query = `SELECT events.idevent, users.name FROM events INNER JOIN users ON users.iduser = events.iduser`;

    const [result] = await con.execute(query);

    await con.end();

    return res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
};
