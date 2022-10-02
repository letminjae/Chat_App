import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import styled from "styled-components";
import { db } from "../firebase";
import { AuthContext, IUser } from "../context/AuthContext";

const Main = styled.div`
  border-bottom: 1px solid gray;
`;

const SearchForm = styled.div`
  padding: 10px;
  input {
    background-color: transparent;
    border: none;
    color: #fff;
    outline: none;

    &::placeholder {
      color: lightgray;
    }
  }
`;

const UserChat = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2f2d52;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
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

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<IUser>({});
  const [isUser, setIsUser] = useState(false);
  const [err, setErr] = useState(false);

  const currentUser = useContext(AuthContext);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        setUser(doc.data());
      });
      setIsUser(true);
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //유저와 유저간의 그룹 (채팅)이 있는지?? 없으면 새로 하나 DB 생성해야함
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));

      // 처음 채팅하는 상대라면?
      if (!res.exists()) {
        // 1. chats 컬렉션에 유저와 유저간의 db를 만들어야함
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        // 2. user chats 만들기
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }
    setUser({});
    setIsUser(false);
    setUsername("");
  };

  return (
    <Main>
      <SearchForm>
        <input
          type="text"
          placeholder="유저를 검색해보세요"
          onChange={onChange}
          onKeyDown={handleKey}
          value={username}
        />
      </SearchForm>
      {err && <span>유저가 없습니다!</span>}
      {isUser ? (
        <UserChat onClick={handleSelect}>
          <img src={user.photoURL} alt="profile" />
          <UserChatInfo>
            <span>{user.displayName}</span>
          </UserChatInfo>
        </UserChat>
      ) : null}
    </Main>
  );
}

export default Search;
