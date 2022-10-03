import React, { useContext, useState } from "react";
import styled from "styled-components";
import Img from "../image/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Main = styled.div`
  height: 50px;
  background-color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;
  }
`;

const Send = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    height: 24px;
    cursor: pointer;
  }

  button {
    border: none;
    padding: 10px 15px;
    cursor: pointer;
  }
`;

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const currentUser = useContext(AuthContext);
  const data = useContext(ChatContext);

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const imgOnChange = (event: any) => {
    setImg(event.target.files[0]);
  };

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      console.log(uploadTask);

      uploadTask.on(
        "state_changed",
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.state.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.state.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp?.now(),
        }),
      });
    }
    
    
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.state.chatId + ".lastMessage"]: {
        text,
      },
      [data.state.chatId + ".date"]: serverTimestamp(),
    });
    
    await updateDoc(doc(db, "userChats", data.state.user.uid), {
      [data.state.chatId + ".lastMessage"]: {
        text,
      },
      [data.state.chatId + ".date"]: serverTimestamp(),
    });

    setText('');
    setImg(null);
  };

  const onKeyUp = (e: any) => {
    if(e.keyCode === 13){
      handleSend()
    }
  }

  return (
    <Main>
      <input type="text" autoFocus={true} onChange={inputOnChange} onKeyUp={onKeyUp} value={text} />
      <Send>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={imgOnChange}
        />
        <label htmlFor="file">
          <img src={Img} alt="Img" />
        </label>
        <button onClick={handleSend}>Send</button>
      </Send>
    </Main>
  );
}

export default Input;
