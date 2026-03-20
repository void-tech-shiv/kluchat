import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessageList({ messages, currentUser, typingUsers }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingUsers]);

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
      ref={scrollRef}
    >
      <AnimatePresence initial={false}>
        {messages.map((msg, i) => {
          const isMine = msg.username === currentUser;
          const showName = !isMine && (i === 0 || messages[i - 1].username !== msg.username);
          
          return (
            <motion.div
              key={msg.id || i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
            >
              {showName && (
                <span className="text-xs text-slate-500 mb-1 ml-1">{msg.username}</span>
              )}
              <div className={`max-w-[70%] px-4 py-2.5 shadow-sm text-sm ${isMine ? 'bubble-sent' : 'bubble-received'} rounded-2xl`}>
                <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                <div className={`text-[10px] text-right mt-1 opacity-70 ${isMine ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {typingUsers.filter(u => u !== currentUser).map((user) => (
          <motion.div
            key={`typing-${user}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-start"
          >
            <div className="bubble-received px-4 py-3 rounded-2xl text-xs text-slate-400 flex items-center gap-2">
              <span className="font-medium text-slate-300">{user}</span> is typing
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
