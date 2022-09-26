import React from "react";
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
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 0.75em;
    color:#8da4f1;
    cursor: pointer;
    img {
      width: 32px;
    }
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

function Register() {
  return (
    <Container>
      <Wrapper>
        <Logo>Let's Chat!</Logo>
        <Title>회원가입</Title>
        <form>
          <input type="text" placeholder="Nickname" />
          <input type="email" placeholder="Email" />
          <input type="pasword" placeholder="Password" />
          <input style={{display: "none"}} type="file" id="file"/>
          <label htmlFor="file">
            <img src={Add} alt="Add"/>
            <span>프로필 사진 등록하기</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>이미 회원이신가요? Login</p>
      </Wrapper>
    </Container>
  );
}

export default Register;
