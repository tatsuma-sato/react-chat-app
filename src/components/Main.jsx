import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'

const Main = ({user}) => {
  return (
    <MainContainer>
      <Sidebar user={user}></Sidebar>
      {/* Chat */}
    </MainContainer>
  )
}

export default Main

const MainContainer = styled.div`
  display: flex;

`