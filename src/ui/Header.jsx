import React from "react";
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);


  align-items: center;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;

  
`;

const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar /> 
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
