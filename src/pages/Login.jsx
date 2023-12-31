import React from "react";

import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Login = () => {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4" style={{ textAlign: "center" }}>
        Log in to your account
      </Heading>

      <LoginForm />
      {/* test user credentials */}
      <p
        style={{
          textAlign: "center",
          border: "1px dashed blue",
          borderRadius: "5px",
          padding: "8px",
        }}
      >

       📧 <b>themysticspice@gmail.com</b> <br />🔑 <b>themysticadmin</b>
      </p>
    </LoginLayout>
  );
};

export default Login;
