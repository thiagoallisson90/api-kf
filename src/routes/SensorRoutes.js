import { Router } from "express";
import { getAll, getByName } from "../controllers/SensorController.js";

const router = Router();

router.get("/:name", getByName);
router.get("/", getAll);

export default router;
