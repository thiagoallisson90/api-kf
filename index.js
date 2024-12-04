import express from "express";
import cors from "cors";
import dataRouter from "./src/routes/DataRoutes.js";
import { createConnection } from "./src/database/db.js";
import sensorRoute from "./src/routes/SensorRoutes.js";

(async () => {
  const app = express();
  const port = 3000;

  app.use(express.json());
  app.use(cors());

  app.use((err, req, res, next) => {
    let useNext = true;
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      useNext = false;
      return res.status(400).json({ error: "Invalid JSON" });
    }
    if (useNext) {
      next();
    }
  });

  app.get("/", (req, res) => {
    res.status(200).json({
      ok: true,
    });
  });
  app.use("/data", dataRouter);
  app.use("/sensor", sensorRoute);

  console.log("Connecting to the database");
  await createConnection();

  app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  });
})();
