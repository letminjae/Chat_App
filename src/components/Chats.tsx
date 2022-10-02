import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import { ChatContext } from "../context/ChatContext";

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
  const [chats, setChats] = useState<any>([]);

  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc: any) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u :any) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <Main>
      {Object.entries(chats)?.sort((a : any, b: any) => b[1].date - a[1].date).map((chat : any) => (
      <UserChat key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img
          src={chat[1].userInfo.photoURL}
          alt="Profile"
        />
        <UserChatInfo>
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </UserChatInfo>
      </UserChat>
      ))}
    </Main>
  );
}

export default Chats;
