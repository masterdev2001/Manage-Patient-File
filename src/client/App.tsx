import { ChangeEvent, useState, useRef } from "react";

import {
  useGetPatients,
  useDeletePatient,
  usePostPatient,
  usePutPatient,
} from "./hooks";
import { Patient, Severity, Status } from "./lib/type";

const App = () => {
  const [data, setData] = useState<string>("");
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const { data: patients, isFetched } = useGetPatients();
  const { mutateAsync: createPatient } = usePostPatient();
  const { mutateAsync: updatePatient } = usePutPatient();
  const { mutateAsync: deletePatient } = useDeletePatient();
  const ref = useRef<HTMLDialogElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result;
        setData(text as string);
      };
      reader.readAsText(e.target.files[0]);
    } else {
      setData("");
    }
  };
  const onUpload = async () => {
    if (!data) {
      alert("No file to upload");
      return;
    }
    const patientData = JSON.parse(data);
    await createPatient({
      patientId: patientData.PatientID,
      name: patientData.PatientName,
      dob: patientData.PatientDOB,
      acquisitionDate: patientData.AcquisitionDate,
      evaluationResult: patientData.EvaluationResult,
      severity: patientData.Severity,
      status: patientData.StatusReview,
      comments: patientData.Comments,
    });
  };

  const onClickRow = (data: Patient) => {
    setPatient(data);
    ref.current?.showModal();
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, name: e.target.value });
  };
  const onChangeDob = (e: ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, dob: e.target.value });
  };
  const onChangeAcquisitionDate = (e: ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, acquisitionDate: e.target.value });
  };
  const onChangeEvaluationResult = (e: ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, evaluationResult: e.target.value });
  };
  const onChangeSeverity = (e: ChangeEvent<HTMLSelectElement>) => {
    setPatient({ ...patient, severity: e.target.value as Severity });
  };
  const onChangeStatusReview = (e: ChangeEvent<HTMLSelectElement>) => {
    setPatient({ ...patient, status: e.target.value as Status });
  };
  const onChangeComments = (e: ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, comments: e.target.value });
  };
  const onUpdate = async () => {
    await updatePatient(patient);
    ref.current?.close();
  };
  const onDelete = async (id: string) => {
    await deletePatient(id);
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload}>Upload</button>
      {isFetched && (
        <table>
          <thead>
            <tr>
              <th>PatientId</th>
              <th>PatientName</th>
              <th>PatientDOB</th>
              <th>AcquisitionDate</th>
              <th>EvaluationResult</th>
              <th>Severity</th>
              <th>StatusReview</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {patients?.map((patient) => (
              <tr key={patient.id} onClick={() => onClickRow(patient)}>
                <td>{patient.patientId}</td>
                <td>{patient.name}</td>
                <td>{patient.dob}</td>
                <td>{patient.acquisitionDate}</td>
                <td>{patient.evaluationResult}</td>
                <td>{patient.severity}</td>
                <td>{patient.status}</td>
                <td>{patient.comments}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(patient.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <dialog ref={ref}>
        <form>
          <section>
            <label>PatientId:</label>
            <input value={patient?.patientId} readOnly />
          </section>
          <section>
            <label>PatientName:</label>
            <input value={patient.name} onChange={onChangeName} />
          </section>
          <section>
            <label>PatientDOB:</label>
            <input type="date" value={patient.dob} onChange={onChangeDob} />
          </section>
          <section>
            <label>AcquisitionDate:</label>
            <input
              type="date"
              value={patient.acquisitionDate}
              onChange={onChangeAcquisitionDate}
            />
          </section>
          <section>
            <label>EvaluationResult:</label>
            <input
              value={patient.evaluationResult}
              onChange={onChangeEvaluationResult}
            />
          </section>
          <section>
            <label>Severity:</label>
            <select value={patient.severity} onChange={onChangeSeverity}>
              {Object.entries(Severity).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </section>
          <section>
            <label>StatusReview:</label>
            <select value={patient.status} onChange={onChangeStatusReview}>
              {Object.entries(Status).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </section>
          <section>
            <label>Comments:</label>
            <input value={patient.comments} onChange={onChangeComments} />
          </section>
        </form>
        <footer>
          <form method="dialog">
            <button type="button" onClick={onUpdate}>
              Update
            </button>
            <button type="submit">Close</button>
          </form>
        </footer>
      </dialog>
    </div>
  );
};

export default App;
