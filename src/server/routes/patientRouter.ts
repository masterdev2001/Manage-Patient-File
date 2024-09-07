import { Router, Response, Request, NextFunction } from "express";

import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController";

const patientRouter = Router();

patientRouter.get(
  "/",
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await getAllPatients();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }
);

patientRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patient = await createPatient(req.body);
      res.json(patient);
    } catch (error) {
      next(error);
    }
  }
);

patientRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const patient = await updatePatient(id, req.body);
      if (!patient) {
        res.status(404).send("Patient is not exist.");
        return;
      }
      res.json(patient);
    } catch (error) {
      next(error);
    }
  }
);

patientRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deletePatient(id);
      res.status(200).send("Delete item successfully.");
    } catch (error) {
      next(error);
    }
  }
);

export default patientRouter;
