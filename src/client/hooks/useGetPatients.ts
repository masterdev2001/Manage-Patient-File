import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Patient } from "../lib/type";

const getPatients = async (): Promise<Patient[]> => {
  const res = await axios.get("/api/patients");
  return res.data;
};

export const useGetPatients = () => {
  return useQuery({
    queryKey: ["useGetPatients"],
    queryFn: getPatients,
  });
};
