import { useState, useEffect } from 'react';
import { socket } from './utils/socket';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    socket.connect();
    socket.emit('join_chat', { username: name });
  };

  return (
    <div className="liquid-bg min-h-screen w-full flex items-center justify-center p-4">
      {!isConnected ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}

export default App;
