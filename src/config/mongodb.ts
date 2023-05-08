import { default as mg } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

mg.connect(process.env.MONGODB_URL as string).catch((error) =>
  console.error(error)
);

mg.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

mg.connection.on("error", (err) => {
  console.error(err);
});

export default mg;
