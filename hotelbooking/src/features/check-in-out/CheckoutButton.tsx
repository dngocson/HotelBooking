import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckout";

function CheckoutButton({ bookingId }: { bookingId: string }) {
  const { checkOut, ischeckingOut } = useCheckOut();
  return (
    <Button
      disabled={ischeckingOut}
      onClick={() => checkOut(bookingId)}
      $variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
