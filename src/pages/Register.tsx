import React, { useState } from "react";
import styled from "styled-components";
import Add from "../image/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useHistory } from "react-router-dom";

const Container = styled.div`
  background-color: #a7bcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 20px 60px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    input {
      padding: 15px;
      border: none;
      border-bottom: 1px solid #a7bcff;
      &::placeholder {
        color: rgb(175, 175, 175);
      }
    }
    button {
      background-color: #7b96ec;
      color: #fff;
      padding: 10px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
  }
  p {
    color: #5d5b8d;
    font-size: 0.85em;
    margin-top: 10px;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 0.75em;
    color: #8da4f1;
    cursor: pointer;
    img {
      width: 32px;
    }
  }
`;

const Logo = styled.span`
  color: #5d5b8d;
  font-weight: 600;
  font-size: 1.5em;
`;

const Title = styled.span`
  color: #5d5b8d;
  font-weight: 600;
`;

function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            history.push("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Logo>Let's Chat!</Logo>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Display Name" />
          <input required type="email" placeholder="Email" />
          <input required type="pasword" placeholder="Password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="Add" />
            <span>프로필 사진 등록하기</span>
          </label>
          <button disabled={loading}>Sign Up</button>
          {loading && "이미지를 업로드하고 있습니다. 잠시만 기다려주세요..."}
          {err && <span>로그인 에러!</span>}
        </form>
        <p>
          이미 회원이신가요? <Link to="/login">Login</Link>
        </p>
      </Wrapper>
    </Container>
  );
}

export default Register;
