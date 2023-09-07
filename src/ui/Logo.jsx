import React from 'react'
import styled from 'styled-components'

import logo1 from '../../public/logo-light.png'
import logo2 from '../../public/logo-dark.png'
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;


const Logo = () => {

  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? logo2 : logo1;

  return (
    <StyledLogo>
        {
          isDarkMode ? (<Img src={src} alt="" />) : (<Img src={src} alt="" />)
        }
    </StyledLogo>
  )
}

export default Logo






