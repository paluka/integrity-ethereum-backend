import * as dotenv from "dotenv";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import User from "../models/user";

dotenv.config();

const api = express.Router();

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: `https://${process.env.DOMAIN}/`,
});

api.post("/", checkJwt, async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
      },
    });
    console.log("success", user[0]);
    console.log("User created:", user[1]);

    if (user[1]) {
      res.send("User created");
    } else {
      res.send("User already exists");
    }
  } catch (error: any) {
    console.error(error.message, email, error.errors);

    res.send("Unable to create the user!");
  }
});

export default api;
