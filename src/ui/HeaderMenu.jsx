import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 0.4rem;
  text-decoration: none;
  list-style-type: none;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
