import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Patient } from "../lib/type";

const updatePatient = async (data: Patient) => {
  await axios.put(`/api/patients/${data.id}`, data);
};

export const usePutPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["usePutPatient"],
    mutationFn: updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetPatients"] });
    },
  });
};
