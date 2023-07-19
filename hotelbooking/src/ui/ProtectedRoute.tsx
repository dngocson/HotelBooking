import React from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // 1. Load the authenticated user

  // 2. While loading, show Spinner

  // 3. If there is No authenticated user, redirect

  // 4. If there is a user, render the app

  return children;
}

export default ProtectedRoute;
