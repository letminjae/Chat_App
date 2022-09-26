import React from 'react'
import styled from 'styled-components'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'

const Main = styled.div`
  flex: 1;
  background-color: #3e3c61;
`

function Sidebar() {
  return (
    <Main>
      <Navbar />
      <Search />
      <Chats />
    </Main>
  )
}

export default Sidebar