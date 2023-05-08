import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const sq = new Sequelize(process.env.POSTGRESQL_URL as string);

export const testDbConnection = async () => {
  try {
    await sq.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDbConnection();

export default sq;
