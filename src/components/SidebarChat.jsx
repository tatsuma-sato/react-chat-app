import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import * as timeage from "timeago.js";

const SidebarChat = ({id, chatName}) => {
  return (
    <SidebarChatContainer>
      <Avatar />
      <SidebarChatInfoContainer>
        <h3>{chatName}</h3>
        <p>chat info</p>
        <TimeStamp>
          {/* timeage */}
        </TimeStamp>
      </SidebarChatInfoContainer>
    </SidebarChatContainer>
  );
};

export default SidebarChat;

const SidebarChatContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;

  :hover {
    background-color: #3e93fd;
    color: white;
  }
`;

const SidebarChatInfoContainer = styled.div`
  margin-left: 15px;
  position: relative;
  width: 100%;
`;

const TimeStamp = styled.small`
  position: absolute;
  top: 5px;
  right: 0;
`;
