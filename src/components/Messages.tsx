import React from "react";
import styled from "styled-components";
import Message from "./Message";

const Main = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 50px - 50px);
`

function Messages() {
  return (
    <Main>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </Main>
  );
}

export default Messages;
