import { default as mg } from "mongoose";

mg.connect("mongodb://localhost/integrity").catch((error) =>
  console.error(error)
);

mg.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

mg.connection.on("error", (err) => {
  console.error(err);
});

export default mg;
