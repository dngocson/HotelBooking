import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: ischeckingOut } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(Number(bookingId), {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checkOut`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: () => toast.error("There is an error when checkOutg in"),
  });
  return { checkOut, ischeckingOut };
}
