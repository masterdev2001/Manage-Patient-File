import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Patient } from "../lib/type";
import axiosClient from "../lib/utils";

type PatientPayload = Omit<Patient, "id">;

const createPatient = async (data: PatientPayload): Promise<Patient> => {
  const res = await axiosClient.post("", data);
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
