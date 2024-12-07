import React, { useState, useEffect } from 'react';
import socket from '../../SockeIo/sococket';
import './styles.css'; 

const Chat = ({ room, username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    
    socket.connect();

    
    socket.emit('join_room', { room, username });

    
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    
    return () => {
      socket.emit('leave_room', room);
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [room, username]);

  const sendMessage = () => {
    if (message.trim()) {
      const data = { content: message, room, sender: username };
      socket.emit('send_message', data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h3>Bem-vindo ao chat da sala: {room}</h3>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === username ? 'my-message' : ''}`}
          >
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="input-chat"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <button className="button-chat" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;

  
  
  

