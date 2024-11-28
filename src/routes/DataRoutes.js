import { Router } from "express";
import {
  create,
  getAllData,
  getDataByDevice,
} from "../controllers/DataController.js";

const router = Router();

router.post("/", create);
router.get("/", getAllData);
router.get("/:device", getDataByDevice);

export default router;
