import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checkin`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      navigate("/");
    },
    onError: () => toast.error("There is an error when checking in"),
  });
  return { checkin, isCheckingIn };
}
