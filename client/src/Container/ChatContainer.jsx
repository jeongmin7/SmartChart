import React, { useState, useEffect, useRef } from "react";
import ChatComponent from "../components/ChatComponent";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;

const ChatContainer = () => {
  const [username, setUsername] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesContainerRef = useRef(null);

  const connect = () => {
    setIsConnecting(true);
    let socket = new SockJS("/ws/chat");
    stompClient = over(socket);
    stompClient.connect({}, (frame) => {
      setConnected(true);
      setIsConnecting(false);
      stompClient.subscribe("/topic/public", (sdkEvent) => {
        onMessageReceived(sdkEvent);
      });
      stompClient.send(
        "/app/chat.addUser",
        {},
        JSON.stringify({ sender: username, type: "JOIN" })
      );
    });
  };

  const sendMessage = () => {
    if (stompClient) {
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify({
          sender: username,
          type: "CHAT",
          content: currentMessage,
        })
      );
      setCurrentMessage("");
    }
  };

  const onMessageReceived = (payload) => {
    let message = JSON.parse(payload.body);
    setMessages((messages) => [...messages, message]);
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    // 스크롤을 맨 아래로 이동하는 코드
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatComponent
      username={username}
      setUsername={setUsername}
      currentMessage={currentMessage}
      setCurrentMessage={setCurrentMessage}
      messages={messages}
      setMessages={setMessages}
      connected={connected}
      isConnecting={isConnecting}
      connect={connect}
      sendMessage={sendMessage}
      messagesContainerRef={messagesContainerRef}
    />
  );
};

export default ChatContainer;
