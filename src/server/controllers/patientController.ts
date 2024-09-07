import { Patient } from "../models/patient";
import AppDataSource from "../utils/datasource";

export const getAllPatients = async () => {
  return await AppDataSource.createQueryBuilder()
    .select("patient")
    .from(Patient, "patient")
    .getMany();
};

export const createPatient = async (data: Patient) => {
  return await AppDataSource.transaction(async (manager) => {
    const newPatient = new Patient(data);
    await manager.save(newPatient);
    return newPatient;
  });
};

export const updatePatient = async (id: string, data: Patient) => {
  return await AppDataSource.transaction(async (manager) => {
    const patient = await manager.findOneBy(Patient, {
      id: id,
    });
    if (patient) {
      patient.updateData(data);
      await manager.save(patient);
    }
    return patient;
  });
};

export const deletePatient = async (id: string) => {
  await AppDataSource.transaction(async (manager) => {
    const patient = await manager.findOneBy(Patient, {
      id: id,
    });
    await manager.delete(Patient, patient);
  });
};
