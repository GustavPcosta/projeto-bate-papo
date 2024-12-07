import './styles.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Api/axios';
import { jwtDecode } from 'jwt-decode';

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        
        const userId = decodedToken.id;
        console.log('UserId:', userId);
        
        api.get(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            console.log('API Response:', response.data);
            setUser(response.data);
            setLoading(false);
            
            
            navigate('/room', { state: { username: response.data.username } });
          })
          .catch(error => {
            console.error('Erro ao buscar os dados do usuário:', error);
            navigate('/');
          });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="home">
      <div className="home-content">
        <h1>Bem-vindo, {user ? user.username : 'Visitante'}!</h1>
        <p>Esta é a página inicial do sistema.</p>
      </div>
    </div>
  );
}

export default Home;
