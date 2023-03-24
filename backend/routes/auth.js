import express from "express";
import Joi from "joi";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MYSQL_CONFIG, jwtSecret } from "../src/config.js";

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const router = express.Router();

router.post("/register", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: `Incorrect data` });
  }

  try {
    const hashedPassword = bcrypt.hashSync(userData.password);
    // const reg_timestamp = new Date().toLocaleString();
    console.log(hashedPassword);
    console.log(userData.password);
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [data] = await con.execute(
      `INSERT INTO admins (name, email, password ) VALUES (${mysql.escape(
        userData.name
      )}, ${mysql.escape(userData.email)}, '${hashedPassword}')`
    );
    console.log({ hashedPassword });
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Unexpected error, try again" });
  }
});

router.post("/signin", async (req, res) => {
  let userData = req.body;
  try {
    userData = await loginUserSchema.validateAsync(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: `Incorrect email or password 1` });
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    console.log(userData.email);
    const [data] = await con.execute(
      `SELECT * FROM admins WHERE email=${mysql.escape(userData.email)}`
    );

    const [data_userId] = await con.execute(
      `SELECT id FROM admins WHERE email=${mysql.escape(userData.email)}`
    );

    await con.end();

    if (!data.length) {
      return res
        .status(400)
        .send({ error: "Incorrect email or password 2" })
        .end();
    }

    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);
    console.log("isAuthed: " + isAuthed);
    console.log(userData.password);
    console.log(data[0].password);

    if (isAuthed) {
      const accessToken = jwt.sign(
        { id: data[0].id, email: data[0].email },
        jwtSecret
      );
      // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.send({ message: "Succesfully logged in", accessToken }).end();
    }

    return res
      .status(400)
      .send({ error: "Incorrect email or password 3" })
      .end();
  } catch (err) {
    return res.status(500).send({ error: "Unexpected error" });
  }
});

// router.get("/signout", (req, res) => {
//   req.logout();
//   res
//     .status(200)
//     .json({
//       status: "Bye!",
//     });
// });

export default router;
