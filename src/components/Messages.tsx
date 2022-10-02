import { doc, onSnapshot } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
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
`;

const Wrapper = styled.div`
  
`;

function Messages() {
  const [messages, setMessages] = useState([]);
  const data = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.state.chatId]);

  return (
    <Main>
      <Wrapper>
        {messages.map((message) => (
          <Message message={message} />
        ))}
      </Wrapper>
    </Main>
  );
}

export default Messages;
