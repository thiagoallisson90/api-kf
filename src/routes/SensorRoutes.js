import { Router } from "express";
import { getByName } from "../controllers/SensorController.js";

const router = Router();

router.get("/:name", getByName);

export default router;
