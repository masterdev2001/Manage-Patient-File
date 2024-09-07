import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Patient } from "../lib/type";
import axiosClient from "../lib/utils";

const updatePatient = async (data: Patient): Promise<Patient> => {
  const res = await axiosClient.put(`/${data.id}`, data);
  return res.data;
};

export const usePutPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["usePutPatient"],
    mutationFn: updatePatient,
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["useGetPatients"] });
      queryClient.setQueryData(["useGetPatients"], (prev: Patient[]) => {
        return prev.map((p) => (p.id === data.id ? data : p));
      });
    },
  });
};
