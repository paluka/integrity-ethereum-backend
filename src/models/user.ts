import * as dotenv from "dotenv";

dotenv.config();

let User: any;

if (process.env.DATABASE === "postgresql") {
  const { DataTypes } = require("sequelize");
  const sq = require("../config/postgresql").default;

  User = sq.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    transactions: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
      allowNull: true,
      defaultValue: [[]],
    },
  });

  User.sync().then(() => {
    console.log("User model synced!");
  });
} else if (process.env.DATABASE === "mongodb") {
  const mg = require("../config/mongodb").default;

  const user = new mg.Schema(
    {
      _id: {
        type: String,
      },
      transactions: {
        type: [[String]],
        //defaultValue: [[]],
      },
    },
    { collection: "users" }
  );

  User = mg.model("user", user);
}

export default User;
