import './styles.css'; 
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../../Api/axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', {
        username,
        password,
      });
      setUser(response.data.user);
      console.log(response.data.user);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data?.message || error.message);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Faça o Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Nome do usuário
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Senha
                  </label>
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                  >
                    Entrar
                  </button>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link to="/createdusers" className="text-blue-500 hover:underline">
                  Criar uma conta
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

