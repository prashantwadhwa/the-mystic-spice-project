import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1-> load authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2-> if user is not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      // toast.error("User not authenticated")
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  //--while loading, show loading indicator
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 3-> if user is authenticated, render children

  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
