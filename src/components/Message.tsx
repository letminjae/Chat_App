import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

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


function Message({message}:any) {

  const currentUser = useContext(AuthContext);
  const data = useContext(ChatContext);

  console.log(message)

  return (
    <Main className="owner">
      <MessageInfo>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRteZw652csQJlP7eaVC8S3U3q-asvP7_20SA&usqp=CAU"
          alt="Profile"
        />
        <span>방금 전</span>
      </MessageInfo>
      <MessageContent>
        <p>안녕</p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRteZw652csQJlP7eaVC8S3U3q-asvP7_20SA&usqp=CAU"
          alt="Profile"
        />
      </MessageContent>
    </Main>
  );
}

export default Message;
