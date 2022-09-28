import React from "react";
import styled from "styled-components";
import Message from "./Message";

const Main = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 50px - 50px);
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // FireFox
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
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
