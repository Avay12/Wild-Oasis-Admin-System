import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "../../services/apiCabins";
import { EditData } from "./CreateCabinForm";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, status } = useMutation({
    mutationFn: ({ newCabin, id }: EditData) =>
      createUpdateCabin({ newCabin, id }),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const isUpdating = status === "pending" ? true : false;

  return { isUpdating, updateCabin };
}
