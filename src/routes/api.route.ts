import * as dotenv from "dotenv";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

let addUser: any;
let addTransaction: any;
let verifyFile: any;

if (process.env.DATABASE === "postgresql") {
  const {
    addPgUser,
    addPgTransaction,
    verifyPgFile,
  } = require("../services/postgresql.service");
  addUser = addPgUser;
  addTransaction = addPgTransaction;
  verifyFile = verifyPgFile;
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

api.post(
  "/user",
  checkJwt,
  async (req: express.Request, res: express.Response) => {
    const email = req.body.email;
    addUser(res, email);
  }
);

api.post(
  "/add",
  checkJwt,
  async (req: express.Request, res: express.Response) => {
    const email = req.body.email;
    const name = req.body.name;
    const hash = req.body.hash;
    addTransaction(res, email, name, hash);
  }
);

api.post(
  "/verify",
  checkJwt,
  async (req: express.Request, res: express.Response) => {
    const email = req.body.email;
    const name = req.body.name;
    const hash = req.body.hash;
    verifyFile(res, email, name, hash);
  }
);

export default api;
