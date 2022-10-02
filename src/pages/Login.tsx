import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

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
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Logo>Let's Chat!</Logo>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
          {err && <span>오류가 발생했습니다!</span>}
        </form>
        <p>회원이 아니신가요? <Link to="/register">Register</Link></p>
      </Wrapper>
    </Container>
  );
}

export default Login;