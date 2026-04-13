import { Trophy, Medal, ChevronUp, ChevronDown, Minus } from "lucide-react";

export function RankingTable({ data, currentUserId }) {
  // Helpers for table rows
  const getBadge = (position) => {
    switch (position) {
      case 1:
        return <Trophy className="h-4 w-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" fill="currentColor" />;
      case 2:
        return <Medal className="h-4 w-4 text-zinc-300 drop-shadow-[0_0_8px_rgba(212,212,216,0.6)]" />;
      case 3:
        return <Medal className="h-4 w-4 text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.6)]" />;
      default:
        return <span className="text-zinc-500 font-bold text-sm">#{position}</span>;
    }
  };

  const getTrendIcon = (userId) => {
    // Deterministic mock trend based on ID
    if (userId === 1) return <Minus className="h-3 w-3 text-zinc-600" />;
    return userId % 2 === 0 ? <ChevronUp className="h-3 w-3 text-emerald-500" /> : <ChevronDown className="h-3 w-3 text-rose-500" />;
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col flex-1 min-h-[500px]">
      <div className="overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="sticky top-0 bg-[#0a0a0c]/90 backdrop-blur-md z-10 border-b border-white/5">
            <tr>
              <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider w-20 text-center">Pos</th>
              <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Desenvolvedor</th>
              <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">XP Total</th>
              <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Streak</th>
              <th className="py-4 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Resolvidos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {data.slice(0, 50).map((user) => {
              const isCurrentUser = user.id === currentUserId;
              return (
                <tr 
                  key={user.id} 
                  className={`group transition-colors duration-200 border-l-2 ${
                    isCurrentUser 
                      ? 'bg-purple-900/10 border-purple-500/50 hover:bg-purple-900/20' 
                      : 'border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Position */}
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 flex justify-center">
                        {getBadge(user.position)}
                      </div>
                      <div className="w-3">
                        {getTrendIcon(user.id)}
                      </div>
                    </div>
                  </td>
                  
                  {/* User Profile */}
                  <td className="py-3 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-inner ${
                        isCurrentUser ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-zinc-800 border border-zinc-700'
                      }`}>
                        {user.avatar}
                      </div>
                      <span className={`font-semibold ${isCurrentUser ? 'text-purple-300' : 'text-zinc-200'} group-hover:text-white transition-colors`}>
                        {user.name}
                      </span>
                      {isCurrentUser && (
                        <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500 text-white tracking-wider">TU</span>
                      )}
                    </div>
                  </td>
                  
                  {/* XP */}
                  <td className="py-3 px-6 whitespace-nowrap text-right">
                    <span className="font-mono font-bold text-purple-400">
                      {user.points.toLocaleString('en-US')}
                    </span>
                  </td>
                  
                  {/* Streak */}
                  <td className="py-3 px-6 whitespace-nowrap text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                      <Flame className="h-3 w-3 text-orange-400" />
                      <span className="text-xs font-bold text-orange-200">{user.streak}</span>
                    </div>
                  </td>
                  
                  {/* Solved */}
                  <td className="py-3 px-6 whitespace-nowrap text-center text-sm font-mono text-zinc-400">
                    {user.solved}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer Paginator Placeholder */}
      <div className="p-4 border-t border-white/5 flex items-center justify-center">
        <button className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
          Carregar mais competidores...
        </button>
      </div>
    </div>
  );
}

// Needed to import Flame at the top in this single file execution context
import { Flame } from "lucide-react";
