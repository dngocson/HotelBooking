import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { styled } from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is No authenticated user, redirect
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show Spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4. If there is a user, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
