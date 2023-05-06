import { Sequelize } from "sequelize";

// Connection parameters
// const sequelize = new Sequelize("database", "username", "password");

// with URI
const sequelize = new Sequelize(
  "postgres://erikpaluka:1234@127.0.0.1:5432/postgres"
);

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const sq = sequelize;
export default sq;
