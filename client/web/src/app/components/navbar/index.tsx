import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Logo } from "../logo";
import { useNavigate } from "react-router-dom";

const NavbarContainer = styled.div`
  min-height: 68px;
  ${tw`
    w-full
    flex
    flex-row
    items-center
    lg:pl-12
    lg:pr-12
    justify-between
    bg-red-500
  `};
`;

const LogoContainer = styled.div`
  cursor: pointer;
`;

export function Navbar() {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <LogoContainer onClick={() => navigate("/")}>
        <Logo />
      </LogoContainer>
    </NavbarContainer>
  );
}
