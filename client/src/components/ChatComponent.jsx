import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatComponent = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://13.125.227.145/ws/chat"); // WebSocket 서버 주소 및 endpoint에 연결

    ws.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      // 받은 데이터에 대한 처리
    };
    // 컴포넌트가 언마운트될 때 웹 소켓 연결을 닫음
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      {/* <div id="username-page">
        <div class="username-page-container">
          <h1 class="title">Type your username </h1>
          <h3 class="title">to enter the Chatroom </h3>
          <form id="usernameForm" name="usernameForm">
            <div class="form-group">
              <input
                type="text"
                id="name"
                placeholder="Username"
                autocomplete="off"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button type="submit" class="accent username-submit">
                Start Chatting
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="chat-page" class="hidden">
        <div class="chat-container">
          <div class="chat-header">
            <h2>Medical Consultation</h2>
          </div>
          <div class="connecting">Connecting...</div>
          <ul id="messageArea"></ul>
          <form id="messageForm" name="messageForm">
            <div class="form-group">
              <div class="input-group clearfix">
                <input
                  type="text"
                  id="message"
                  placeholder="Type a message..."
                  autocomplete="off"
                  class="form-control"
                />
                <button type="submit" class="primary">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default ChatComponent;
/** {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

html,body {
    height: 100%;
    overflow: hidden;
}

body {
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.58;
    color: #333;
    background-color: #f4f4f4;
    height: 100%;
}

.clearfix:after {
    display: block;
    content: "";
    clear: both;
}

.hidden {
    display: none;
}

.form-control {
    width: 100%;
    min-height: 38px;
    font-size: 15px;
    border: 1px solid #c8c8c8;
}

.form-group {
    margin-bottom: 15px;
}

input {
    padding-left: 10px;
    outline: none;
}

h1, h2, h3, h4, h5, h6 {
    margin-top: 20px;
    margin-bottom: 20px;
}

h1 {
    font-size: 1.7em;
}

a {
    color: #6db33f;
}

button {
    box-shadow: none;
    border: 1px solid transparent;
    font-size: 14px;*/
