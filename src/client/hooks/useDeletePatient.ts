import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Patient } from "../lib/type";

const deletePatient = async (id: string): Promise<string> => {
  await axios.delete(`/api/patients/${id}`);
  return id;
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDeletePatient"],
    mutationFn: deletePatient,
    onSuccess: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["useGetPatients"] });
      queryClient.setQueryData(["useGetPatients"], (prev: Patient[]) =>
        prev?.filter((p) => p.id !== id)
      );
    },
  });
};
