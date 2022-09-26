import React from 'react'
import styled from 'styled-components'
import Cam from '../image/cam.png'
import Add from '../image/add.png'
import More from '../image/more.png'

const Main = styled.div`
  flex: 2;
`

const ChatInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #5d5b8d;
  padding: 10px 12px;
  color: lightgray;
  span {
    font-size: 1.25em;
    font-weight: 500;
  }
`

const ChatIcons = styled.div`
  display: flex;
  gap: 10px;

  img {
    height: 24px;;
    cursor: pointer;
  }
`

function Header() {
  return (
    <Main>
      <ChatInfo>
        <span>수지</span>
        <ChatIcons>
          <img src={Cam} alt='Cam' />
          <img src={Add} alt='Add' />
          <img src={More} alt='More' />
        </ChatIcons>
      </ChatInfo>
    </Main>
  )
}

export default Header