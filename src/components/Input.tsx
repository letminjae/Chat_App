import React from 'react'
import styled from 'styled-components'
import Img from '../image/img.png'
import Attach from '../image/attach.png'

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
`

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
`

function Input() {
  return (
    <Main>
      <input type="text" autoFocus={true} />
      <Send>
        <img src={Attach} alt='Attach' />
        <input type="file" style={{display:"none"}} id='file' />
        <label htmlFor='file'>
          <img src={Img} alt='Img' />
        </label>
        <button>Send</button>
      </Send>
    </Main>
  )
}

export default Input