import { io } from 'socket.io-client';

const token = localStorage.getItem('token');

const socket = io('http://localhost:8080', {
  query: {
    token: token,
  },
  transports: ['websocket'], 
});

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err);
});

export default socket;