import { useState, useRef, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';

export default function MessageInput({ onSendMessage, onTyping }) {
  const [text, setText] = useState('');
  const typingTimeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText('');
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      onTyping(false);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    
    // Emit typing indicator
    onTyping(true);
    
    // Clear typing indicator after 2s of inactivity
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  return (
    <div className="p-4 bg-slate-900/40 border-t border-white/5 backdrop-blur-md">
      <form 
        onSubmit={handleSubmit}
        className="flex items-end gap-2 max-w-4xl mx-auto relative glass-panel rounded-2xl p-1 pr-2"
      >
        <button 
          type="button" 
          className="p-3 text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>
        
        <textarea
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type a message..."
          className="flex-1 bg-transparent max-h-32 min-h-[44px] py-3 text-sm text-white placeholder:text-slate-500 resize-none outline-none custom-scrollbar"
          rows={1}
        />
        
        <button
          type="submit"
          disabled={!text.trim()}
          className="p-2.5 mb-0.5 rounded-xl bg-indigo-500 text-white disabled:opacity-50 disabled:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
}
