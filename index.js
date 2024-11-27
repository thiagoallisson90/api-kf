import express from "express";
import cors from "cors";
import dataRouter from "./src/routes/DataRoutes.js";
import { createConnection } from "./src/database/db.js";

(async () => {
  const app = express();
  const port = 3000;

  app.use(express.json());
  app.use(cors());
  app.use("/data", dataRouter);

  console.log("Connecting to the database");
  await createConnection();

  app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  });
})();
