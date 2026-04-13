import { Trophy } from "lucide-react";

export function Podium({ topUsers }) {
  const [first, second, third] = topUsers;

  return (
    <div className="flex items-end justify-center gap-4 md:gap-8 min-h-[300px] mb-12 mt-8">
      {/* 2nd Place */}
      <PodiumStep 
        user={second} 
        height="180px" 
        colorClass="from-purple-500/80 to-purple-800/80"
        shadowClass="shadow-purple-500/20"
        textClass="text-purple-300"
        bgColor="bg-purple-500/10"
        order={2}
      />
      
      {/* 1st Place */}
      <PodiumStep 
        user={first} 
        height="240px" 
        colorClass="from-fuchsia-500 to-fuchsia-800"
        shadowClass="shadow-fuchsia-500/40"
        textClass="text-fuchsia-100"
        bgColor="bg-fuchsia-500/20"
        order={1}
        isWinner
      />

      {/* 3rd Place */}
      <PodiumStep 
        user={third} 
        height="140px" 
        colorClass="from-indigo-500/80 to-indigo-800/80"
        shadowClass="shadow-indigo-500/20"
        textClass="text-indigo-300"
        bgColor="bg-indigo-500/10"
        order={3}
      />
    </div>
  );
}

function PodiumStep({ user, height, colorClass, shadowClass, textClass, bgColor, order, isWinner }) {
  return (
    <div className="flex flex-col items-center group relative w-24 md:w-32">
      {/* User Info Floater */}
      <div className="flex flex-col items-center mb-4 transition-transform duration-300 group-hover:-translate-y-2">
        <div className={`relative flex items-center justify-center ${isWinner ? 'w-20 h-20' : 'w-16 h-16'} rounded-full text-xl font-bold border-2 ${bgColor} border-white/10 backdrop-blur-md mb-3 z-10 shadow-lg ${shadowClass}`}>
          {isWinner && (
            <Trophy className="absolute -top-6 text-fuchsia-400 drop-shadow-[0_0_15px_rgba(232,121,249,0.8)]" fill="currentColor" size={28} />
          )}
          <span className={textClass}>{user.initials}</span>
        </div>
        <p className={`font-semibold text-center truncate w-full text-sm md:text-base ${isWinner ? 'text-white' : 'text-zinc-300'}`}>{user.name}</p>
        <p className="text-xs text-zinc-400 font-mono mt-1 font-bold">{user.points} pts</p>
      </div>
      
      {/* Podium Block */}
      <div 
        className={`w-full rounded-t-xl bg-gradient-to-b ${colorClass} shadow-2xl relative overflow-hidden flex items-start justify-center pt-4 border-t border-white/20`}
        style={{ height }}
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className={`text-4xl font-black opacity-40 mix-blend-overlay ${isWinner ? 'text-white' : 'text-zinc-900'}`}>
          {order}
        </span>
      </div>
    </div>
  );
}
