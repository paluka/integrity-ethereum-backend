import { Sequelize } from "sequelize";

const sq = new Sequelize("postgres://erikpaluka:1234@127.0.0.1:5432/integrity");

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
