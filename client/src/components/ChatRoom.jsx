import React, { useState } from "react";
import styled from "styled-components";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Form>
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
      </Form>
    </Container>
  );
};

export default ChatRoom;
const Container = styled.div`
  position: relative;
  height: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
  margin-top: 30px;
  height: calc(100% - 60px);
  max-height: 600px;
`;
const Form = styled.form`
  margin-bottom: 15px;
`;
