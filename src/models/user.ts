import { DataTypes } from "sequelize";
import sq, { testDbConnection } from "../config/db";

testDbConnection();

const User = sq.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  hashes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

User.sync().then(() => {
  console.log("User model synced!");
});

export default User;
