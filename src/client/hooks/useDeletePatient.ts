import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deletePatient = async (id: string) => {
  await axios.delete(`/api/patients/${id}`);
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useDeletePatient"],
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetPatients"] });
    },
  });
};
