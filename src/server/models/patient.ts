import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { Severity, Status } from "../utils/type";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  patientId: number;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  acquisitionDate: Date;

  @Column()
  evaluationResult: string;

  @Column()
  severity: Severity;

  @Column()
  status: Status;

  @Column()
  comments: string;

  constructor(data: Patient) {
    this.updateData(data);
  }

  updateData(data: Patient) {
    this.patientId = data.patientId;
    this.name = data.name;
    this.dob = data.dob;
    this.acquisitionDate = data.acquisitionDate;
    this.evaluationResult = data.evaluationResult;
    this.severity = data.severity;
    this.status = data.status;
    this.comments = data.comments;
  }
}
