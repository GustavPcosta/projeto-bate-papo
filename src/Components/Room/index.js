import './styles.css';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Chat from '../../Pages/Chat';

const Room = () => {
  const location = useLocation();
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState(location.state?.username || '');
  const [isChatActive, setIsChatActive] = useState(false);

  const handleJoinRoom = () => {
    if (room.trim() && username.trim()) {
      setIsChatActive(true);
    } else {
      alert('Por favor, insira um nome de usuário e uma sala!');
    }
  };

  return (
    <div className="room-container">
      {!isChatActive ? (
        <div>
          <h2>Bem-vindo ao Chat</h2>
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome da Sala"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Entrar na Sala</button>
        </div>
      ) : (
        <Chat room={room} username={username} />
      )}
    </div>
  );
};

export default Room;
