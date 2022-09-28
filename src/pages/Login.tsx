import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Add from "../image/addAvatar.png"

const Container = styled.div`
  background-color: #a7bcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 20px 60px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    input {
      padding: 15px;
      border: none;
      border-bottom: 1px solid #a7bcff;
      &::placeholder{
        color: rgb(175,175,175)
      }
    }
    button {
      background-color: #7b96ec;
      color: #fff;
      padding: 10px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
  }
  p {
    color: #5d5b8d;
    font-size: 0.85em;
    margin-top: 10px;
  }
`;

const Logo = styled.span`
  color: #5d5b8d;
  font-weight: 600;
  font-size: 1.5em;
`;

const Title = styled.span`
  color: #5d5b8d;
  font-weight: 600;
`;

function Login() {
  return (
    <Container>
      <Wrapper>
        <Logo>Let's Chat!</Logo>
        <Title>로그인</Title>
        <form>
          <input type="email" placeholder="Email" />
          <input type="pasword" placeholder="Password" />
          <button>Sign In</button>
        </form>
        <p>회원이 아니신가요? <Link to="/register">Register</Link></p>
      </Wrapper>
    </Container>
  );
}

export default Login;