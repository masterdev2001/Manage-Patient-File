import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { Severity, Status } from "../utils/type";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int" })
  patientId: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "date" })
  dob: Date;

  @Column({ type: "date" })
  acquisitionDate: Date;

  @Column({ type: "varchar" })
  evaluationResult: string;

  @Column({ type: "enum", enum: Severity })
  severity: Severity;

  @Column({ type: "enum", enum: Status })
  status: Status;

  @Column({ type: "varchar" })
  comments: string;
}
