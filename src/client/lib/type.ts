export enum Severity {
  NONE = "None",
  SEVERE = "Severe",
  MODERATE = "Moderate",
}

export enum Status {
  DONE = "Done",
  IN_REVIEW = "In Review",
  PROGRESS = "Progress",
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
