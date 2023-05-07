import * as dotenv from "dotenv";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

let addUser: any;

if (process.env.DATABASE === "postgresql") {
  const { addPgUser } = require("../services/postgresql.service");
  addUser = addPgUser;
} else if (process.env.DATABASE === "mongodb") {
  const { addMongoUser } = require("../services/mongodb.service");
  addUser = addMongoUser;
}

dotenv.config();

const api = express.Router();

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: `https://${process.env.DOMAIN}/`,
});

api.post("/", checkJwt, async (req: express.Request, res: express.Response) => {
  const email = req.body.email;
  addUser(res, email);
});

export default api;
