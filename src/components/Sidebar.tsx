import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'

const Main = styled.div`
  flex: 1;
  background-color: #3e3c61;
`

function Sidebar() {
  return (
    <Main>
      <Navbar />
    </Main>
  )
}

export default Sidebar