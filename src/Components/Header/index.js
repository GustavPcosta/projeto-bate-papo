import { useEffect, useState } from 'react';
import api from  '../../Api/axios';
import './styles.css'; 
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
    const token = localStorage.getItem('token');
      try {
        const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
        const response = await api.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="header">
      {user ? (
        <p>Bem-vindo, {user.username}</p>
      ) : (
        <p>Carregando informações...</p>
      )}
    </div>
  );
};

export default Header;
