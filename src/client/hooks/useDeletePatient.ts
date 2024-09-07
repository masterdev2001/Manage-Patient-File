import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { Patient } from "../lib/type";
import axiosClient from "../lib/utils";

const deletePatient = async (id: string): Promise<string> => {
  await axiosClient.delete(`/${id}`);
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
