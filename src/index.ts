import express from "express";
import dotenv from "dotenv";
import httpRequestLogger from "morgan";
import http from "http";

import { logger } from "./services/logger";
import mainRouter from "./routes/main.routes";

dotenv.config();

const port = process.env.SERVER_PORT || 3000;
const app = express();

app.set("port", port);

app.use(httpRequestLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", mainRouter);

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});
