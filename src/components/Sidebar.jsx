import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import { RateReviewOutlined } from "@material-ui/icons";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
} from "@firebase/firestore";
import { signOut } from "firebase/auth";

import { auth, db } from "../firebase/firebase.util";
import SidebarChat from "./SidebarChat";

const Sidebar = ({ user }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (chats.length === 0) {
      fetchChat();
    }
    console.log(chats);
  }, [chats]);

  const fetchChat = async () => {
    const chatRef = collection(db, "chats");

    const q = query(chatRef, orderBy("timestamp", "desc"));

    await getDocs(q).then((snapshot) => {
      console.log(snapshot);
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  const addChat = async () => {
    const chatName = prompt("Please enter a chat");

    if (chatName) {
      const chatRef = collection(db, "chats");
      await addDoc(chatRef, {
        // chatName,
        chatName: chatName,
        timestamp: serverTimestamp(),
      }).then((res) => console.log(res));
    }
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarAvatar src={user.photoURL} onClick={() => signOut(auth)} />
        <SidebarTitle>{user.displayName}</SidebarTitle>
        <IconButton varient="outline" onClick={addChat}>
          <RateReviewOutlined />
        </IconButton>
      </SidebarHeader>
      <SidebarChats>
        {chats &&
          chats.map(({ id, data: { chatName } }) => (
            <SidebarChat key={id} id={id} chatName={chatName} />
          ))}
      </SidebarChats>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  flex: 0.35;
  height: 100vh;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid lightgray;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 50px;
`;

const SidebarAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 10px;
`;

const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #e1e1e1;
  color: gray;
  border-radius: 5px;
`;

const SidebarChats = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkits-scrollbar {
    display: none;
  }
`;
