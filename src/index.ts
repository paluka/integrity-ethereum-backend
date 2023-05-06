import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

if (!process.env.PORT || !process.env.DOMAIN || !process.env.AUDIENCE) {
  console.error(
    "Error: You are missing PORT, DOMAIN, and/or AUDIENCE in your .env file!"
  );
  process.exit(1);
}

import api from "./routes/api.route";

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/", api);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
