import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { timeForToday } from "../shared/TimeForToday";

const MessageContent = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    background-color: white;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
    max-width: max-content;
  }

  img {
    width: 50%;
  }
`;

const Main = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  &.owner {
    flex-direction: row-reverse;

    ${MessageContent} {
      align-items: flex-end;

      p {
        background-color: #8da4f1;
        color: white;
        border-radius: 10px 0px 10px 10px;
      }
    }
  }
`;

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

function Message({ message }: any) {
  const currentUser = useContext(AuthContext);
  const data = useContext(ChatContext);

  const ref = useRef<null | HTMLDivElement>(null);

  console.log(message);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Main
      ref={ref}
      className={`${message.senderId === currentUser.uid && "owner"}`}
    >
      <MessageInfo>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.state.user.photoURL
          }
          alt="Profile"
        />
        <span>{timeForToday(message.date.seconds)}</span>
      </MessageInfo>
      <MessageContent>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="uploadImg" />}
      </MessageContent>
    </Main>
  );
}

export default Message;
