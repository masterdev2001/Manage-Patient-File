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
      await createPatient(req.body);
      res.sendStatus(200).send("Add patient successfully.");
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
      const patient = updatePatient(id, req.body);
      if (!patient) {
        res.status(404).send("Patient is not exist.");
        return;
      }
      res.sendStatus(200).send("Update patient successfully.");
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
