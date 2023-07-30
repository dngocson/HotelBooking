import styled from "styled-components";
import { useRecentBookiing } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStay } from "./useRecentStay";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookiing();
  const {
    stays,
    isLoading: isLoading2,
    confirmedStay,
    numDays,
  } = useRecentStay();
  const { cabins, isLoading: isLoading3 } = useCabin();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  console.log(confirmedStay);
  console.log(`stay`, stays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStays={confirmedStay}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <SalesChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
