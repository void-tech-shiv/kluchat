import { useState, useEffect } from 'react';
import { socket } from '../utils/socket';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());

  useEffect(() => {
    // Initial data
    socket.on('chat_history', (history) => {
      setMessages(history);
    });

    socket.on('update_users', (activeUsers) => {
      setUsers(activeUsers);
    });

    // Message events
    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // User presence events
    socket.on('user_joined', ({ message }) => {
      // Ignore system messages for minimal UI, or display lightly.
    });

    socket.on('user_left', ({ message }) => {
      // Ignore
    });

    // Typing events
    socket.on('user_typing', ({ username: typingUser, isTyping }) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        if (isTyping) newSet.add(typingUser);
        else newSet.delete(typingUser);
        return newSet;
      });
    });

    return () => {
      socket.off('chat_history');
      socket.off('update_users');
      socket.off('receive_message');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('user_typing');
    };
  }, []);

  const handleSendMessage = (text) => {
    socket.emit('send_message', { text });
  };

  const handleTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  return (
    <div className="w-full h-[90vh] max-w-6xl mx-auto glass-panel rounded-3xl overflow-hidden flex">
      <Sidebar users={users} currentUser={username} />
      <div className="flex-1 flex flex-col relative">
        <div className="h-16 border-b border-white/5 flex items-center px-6 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-white/90">Local Network Chat</h2>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
            <span className="text-sm text-emerald-400/90 font-medium">Connected</span>
          </div>
        </div>
        
        <MessageList 
          messages={messages} 
          currentUser={username} 
          typingUsers={Array.from(typingUsers)} 
        />
        
        <MessageInput 
          onSendMessage={handleSendMessage} 
          onTyping={handleTyping} 
        />
      </div>
    </div>
  );
}
