import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { CabinForm, IApiError } from "../../type/type";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newcabin: CabinForm) => createEditCabin(newcabin),
    onSuccess: () => {
      toast.success("New Cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: IApiError) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
