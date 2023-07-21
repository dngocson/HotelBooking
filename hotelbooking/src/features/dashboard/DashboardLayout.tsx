import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
import React from "react";

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Crat</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
