import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Patient } from "../lib/type";

const createPatient = async (data: Patient): Promise<Patient> => {
  const res = await axios.post("/api/patients", data);
  return res.data;
};

export const usePostPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["usePostPatient"],
    mutationFn: createPatient,
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["useGetPatients"] });
      queryClient.setQueryData(["useGetPatients"], (prev: Patient[]) => [
        ...prev,
        data,
      ]);
    },
  });
};
