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
    const newPatient = new Patient();
    newPatient.patientId = data.patientId;
    newPatient.name = data.name;
    newPatient.dob = data.dob;
    newPatient.acquisitionDate = data.acquisitionDate;
    newPatient.evaluationResult = data.evaluationResult;
    newPatient.severity = data.severity;
    newPatient.status = data.status;
    newPatient.comments = data.comments;
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
      patient.patientId = data.patientId;
      patient.name = data.name;
      patient.dob = data.dob;
      patient.acquisitionDate = data.acquisitionDate;
      patient.evaluationResult = data.evaluationResult;
      patient.severity = data.severity;
      patient.status = data.status;
      patient.comments = data.comments;
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
