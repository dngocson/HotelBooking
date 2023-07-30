import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({
  bookings,
  confirmStays,
  numDays,
  cabinCount,
}: {
  bookings: any;
  confirmStays: any;
  numDays: any;
  cabinCount: any;
}) {
  //1.
  const numBooking = bookings.length;

  //2.
  const sales =
    bookings.reduce((acc: any, cur: any) => acc + cur.totalPrice, 0) /
    (numDays * cabinCount);

  //3.
  const checkins = confirmStays.length;

  //4.
  const occupation = confirmStays.reduce(
    (acc: any, cur: any) => acc + cur.numNights,
    0
  );
  return (
    <>
      <Stat
        title={`Bookings`}
        color={`blue`}
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title={`Sales`}
        color={`green`}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={`Check in`}
        color={`indigo`}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={`Occupancy rate`}
        color={`yellow`}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation) + "%"}
      />
    </>
  );
}

export default Stats;
