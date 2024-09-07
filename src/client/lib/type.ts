export enum Severity {
  Severe = "Severe",
  Moderate = "Moderate",
}

export enum Status {
  Done = "Done",
  In_Review = "In Review",
  Progress = "Progress",
}

export interface Patient {
  id: string;
  patientId: number;
  name: string;
  dob: string;
  acquisitionDate: string;
  evaluationResult: string;
  severity: Severity;
  status: Status;
  comments: string;
}
