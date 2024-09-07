import { Router } from "express";
import patientRouter from "./patientRouter";

const router = Router();
router.use("/patients", patientRouter);

export default router;
