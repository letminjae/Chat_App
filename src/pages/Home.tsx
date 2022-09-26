import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Main = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  border: 1px solid #fff;
  border-radius: 10px;
  width: 65%;
  height: 80%;
  display: flex;
  overflow: hidden;
`

function Home() {
  return (
    <Main>
      <Container>
        <Sidebar />
        <Header />
      </Container>
    </Main>
  )
}

export default Home