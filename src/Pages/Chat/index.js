import React, { useState, useEffect } from 'react';
import socket from '../../SockeIo/sococket'; 
import './styles.css';

const Chat = ({ room, username, token }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect({ query: { token } });

    socket.emit('join_room', { room, username, token });

    
    socket.on('receive_message', (data) => {
      
      if (data.sender !== username) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.emit('leave_room', room);
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [room, username, token]);

  const sendMessage = () => {
    if (message.trim()) {
      const data = { content: message, room, sender: username };

      
      socket.emit('send_message', data);

      
      setMessages((prevMessages) => [
        ...prevMessages, 
        { ...data, side: 'right' } // Marcação do lado de envio
      ]);

      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 text-gray-700">
    
      <div className="w-full max-w-2xl h-[500px] bg-white rounded-lg shadow-md flex flex-col">
      
        <div className="flex justify-between items-center bg-gray-200 px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <h1 className="font-semibold text-lg text-gray-600">
            Bem-vindo ao chat da sala: {room}
          </h1>
        </div>

       
        <ul className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg ${
                  msg.side === 'right'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            </li>
          ))}
        </ul>

        
        <div className="flex items-center gap-4 px-4 py-3 bg-white border-t">
          <input
            type="text"
            className="flex-1 h-10 px-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;



