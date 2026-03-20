import { Users, Wifi, Circle } from 'lucide-react';

export default function Sidebar({ users, currentUser }) {
  return (
    <div className="w-64 border-r border-white/5 bg-slate-900/60 flex-col hidden md:flex">
      <div className="h-16 border-b border-white/5 flex items-center px-6">
        <Wifi className="w-5 h-5 text-indigo-400 mr-3" />
        <h2 className="font-semibold tracking-wide text-white">Network Room</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex items-center gap-2 mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <Users className="w-4 h-4" />
          <span>Online — {users.length}</span>
        </div>
        
        <div className="space-y-1">
          {users.map((user, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${user === currentUser ? 'bg-indigo-500/10 text-indigo-200' : 'hover:bg-white/5 text-slate-300'}`}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-medium border border-white/5">
                  {user.charAt(0).toUpperCase()}
                </div>
                <Circle className="w-3 h-3 text-emerald-400 absolute fill-emerald-400 -bottom-0.5 -right-0.5 ring-2 ring-slate-900 rounded-full" />
              </div>
              <span className="text-sm font-medium truncate flex-1">
                {user}
              </span>
              {user === currentUser && (
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">You</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
