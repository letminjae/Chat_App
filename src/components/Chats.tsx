import React from "react";
import styled from "styled-components";

const Main = styled.div``;

const UserChat = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  &:hover {
    background-color: #2f2d52;
  }
`;

const UserChatInfo = styled.div`
  span {
    font-size: 18px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    color: lightgray;
  }
`;

function Chats() {
  return (
    <Main>
      <UserChat>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRteZw652csQJlP7eaVC8S3U3q-asvP7_20SA&usqp=CAU"
          alt="Suzy"
        />
        <UserChatInfo>
          <span>수지</span>
          <p>안녕</p>
        </UserChatInfo>
      </UserChat>
    </Main>
  );
}

export default Chats;
