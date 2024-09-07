import { useQuery } from "@tanstack/react-query";

import { Patient } from "../lib/type";
import axiosClient from "../lib/utils";

const getPatients = async (): Promise<Patient[]> => {
  const res = await axiosClient.get("");
  return res.data;
};

export const useGetPatients = () => {
  return useQuery({
    queryKey: ["useGetPatients"],
    queryFn: getPatients,
  });
};
