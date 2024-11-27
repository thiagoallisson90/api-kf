import { Router } from "express";
import { create } from "../controllers/DataController.js";

const router = Router();

router.post("/", create);

export default router;
