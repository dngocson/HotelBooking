import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { IApiError } from "../../type/type";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
    },
    onError: (err: IApiError) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
