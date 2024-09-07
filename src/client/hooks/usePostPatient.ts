import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Patient } from "../lib/type";

const createPatient = async (data: Patient) => {
  await axios.post("/api/patients", data);
};

export const usePostPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["usePostPatient"],
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetPatients"] });
    },
  });
};
