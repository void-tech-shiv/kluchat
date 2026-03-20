import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Auto-connect set to false so we can connect only after entering username
export const socket = io(URL, {
  autoConnect: false,
});
