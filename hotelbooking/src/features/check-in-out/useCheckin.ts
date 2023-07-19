import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface BreakfastProps {
  hasBreakfast?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
}

interface MutationFnProps {
  bookingId: number;
  breakfast: BreakfastProps;
}
export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: MutationFnProps) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checkin`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      navigate("/");
    },
    onError: () => toast.error("There is an error when checking in"),
  });
  return { checkin, isCheckingIn };
}
