import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="glass-panel w-full max-w-md p-8 rounded-2xl shadow-2xl flex flex-col items-center"
    >
      <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30">
        <MessageSquare className="w-8 h-8 text-indigo-400" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Local Network Chat
      </h1>
      <p className="text-slate-400 mb-8 text-center text-sm leading-relaxed">
        Connect instantly with people on your network. No registration required.
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Choose a username..."
            className="glass-input w-full rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-slate-400 font-medium"
            maxLength={20}
            required
            autoFocus
          />
        </div>
        
        <button
          type="submit"
          disabled={!name.trim()}
          className="glass-button w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden text-indigo-100"
        >
          <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
            Enter Nexus <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </form>
    </motion.div>
  );
}
