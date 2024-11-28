import mongoose from "mongoose";
import { config } from "dotenv";

const createConnection = async () => {
  config();

  await mongoose.connect(process.env.DB_CONN);

  mongoose.connection.on("connected", () => {
    console.log("Connection established");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error on connection", err);
  });

  process.on("SIGINT", async () => {
    try {
      await mongoose.connection.close();
      console.log("Conection closed");
      process.exit(0);
    } catch (err) {
      console.error("Error to close connection:", err);
      process.exit(1);
    }
  });
};
export { createConnection };
