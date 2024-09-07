import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Patient } from "../lib/type";

const updatePatient = async (data: Patient): Promise<Patient> => {
  const res = await axios.put(`/api/patients/${data.id}`, data);
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
        console.log(data);
        console.log(prev.map((p) => (p.id === data.id ? data : p)));
        return prev.map((p) => (p.id === data.id ? data : p));
      });
    },
  });
};
