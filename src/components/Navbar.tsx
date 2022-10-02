import React, { useContext } from "react";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Main = styled.div`
  display: flex;
  align-items: center;
  background-color: #2f2d52;
  height: 50px;
  padding: 10px;
  justify-content: space-between;
  color: #ddddf7;
`;

const Logo = styled.span`
  font-weight: 600;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    background-color: #ddddf7;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background-color: #5d5b8d;
    color: #ddddf7;
    font-size: 0.75em;
    border: none;
    cursor: pointer;
    padding: 6px;
  }
`;

function Navbar() {
  const currentUser = useContext(AuthContext);

  return (
    <Main>
      <Logo>Let's Chat!</Logo>
      <User>
        <img src={currentUser.photoURL} alt="Profile" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </User>
    </Main>
  );
}

export default Navbar;
