import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #a7bcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  
`;

const Logo = styled.span``;

const Title = styled.span``;

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
          <input type="file" />
          <button>Sign Up</button>
        </form>
        <p>이미 회원이신가요? Login</p>
      </Wrapper>
    </Container>
  );
}

export default Register;
