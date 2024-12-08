import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Chat from '../../Pages/Chat';
import './styles.css';

const Room = () => {
  const location = useLocation();
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState(location.state?.username || '');
  const [isChatActive, setIsChatActive] = useState(false);

  const token = localStorage.getItem('token');

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (room.trim() && username.trim() && token) {
      setIsChatActive(true);
    } else {
      alert(
        'Por favor, insira um nome de usuário e uma sala, e certifique-se de que você está autenticado!'
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      {!isChatActive ? (
        <>
          <h1 className="font-bold text-2xl">Bem-vindo ao chat :)</h1>
          <form
            onSubmit={handleJoinRoom}
            className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
          >
            {/* Campo Username */}
            <label className="font-semibold text-xs" htmlFor="usernameField">
              Nome do Usuário
            </label>
            <input
              id="usernameField"
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome de usuário"
            />

            {/* Campo Room */}
            <label className="font-semibold text-xs mt-3" htmlFor="roomField">
              Nome da Sala
            </label>
            <input
              id="roomField"
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Digite o nome da sala"
            />

            {/* Botão de Entrar */}
            <button
              type="submit"
              className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
            >
              Entrar na Sala
            </button>
          </form>

          <div className="flex mt-6 justify-center text-xs">
            {/* <Link to="/forgot-password" className="text-blue-400 hover:text-blue-500">
              Esqueci minha senha
            </Link> */}
            <span className="mx-2 text-gray-300">/</span>
            <Link to="/createdusers" className="text-blue-400 hover:text-blue-500">
              Criar conta
            </Link>
          </div>
        </>
      ) : (
        <Chat room={room} username={username} token={token} />
      )}
    </div>
  );
};

export default Room;
