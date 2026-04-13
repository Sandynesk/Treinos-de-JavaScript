// Mock data for the Donezo-style dashboard
export const mockUser = {
  name: "CodeMaster Mike",
  initials: "CM",
  avatar: null,
};

export const mockMetrics = {
  solved: { value: 450, label: "Problemas Resolvidos", change: "+15%", sub: "a mais que o mês passado", trend: "up" },
  accepted: { value: 200, label: "Soluções Aceitas", sub: "do total resolvidas" },
  contests: { value: 3, label: "Concursos Ativos", sub: "participe agora" },
  streak: { value: "32 dias", label: "Streak Atual", sub: "recorde: 45 dias" },
};

export const mockDifficultyData = [
  { name: "Fácil", resolvidos: 180, total: 250, fill: "#16a34a" },
  { name: "Médio", resolvidos: 140, total: 200, fill: "#4ade80" },
  { name: "Difícil", resolvidos: 30, total: 100, fill: "#71717a" },
  { name: "Hard", resolvidos: 22, total: 50, fill: "#15803d" },
  { name: "Expert", resolvidos: 8, total: 20, fill: "#166534" },
  { name: "Bonus", resolvidos: 70, total: 100, fill: "#86efac" },
];

export const mockRanking = [
  { id: 1, name: "Alexandra Deff", initials: "AD", points: "14,520", trend: "up", position: 1 },
  { id: 2, name: "CodeMaster Mike", initials: "CM", points: "12,840", trend: "up", position: 2 },
  { id: 3, name: "Yuki Tanaka", initials: "YT", points: "11,200", trend: "down", position: 3 },
  { id: 4, name: "Lucas Mendes", initials: "LM", points: "9,850", trend: "up", position: 4 },
];

export const mockRecentProblems = [
  { id: 1, title: "Sorting Algos", status: "Iniciado", statusColor: "text-yellow-500" },
  { id: 2, title: "DP Challenge", status: "Concluído", statusColor: "text-green-600" },
  { id: 3, title: "Graph Problems", status: "Em Discussão", statusColor: "text-zinc-400" },
  { id: 4, title: "Palíndromo Mais Longo", status: "Em Andamento", statusColor: "text-blue-500" },
  { id: 5, title: "Binary Tree Max Path", status: "Concluído", statusColor: "text-green-600" },
];

export const mockTeamProgress = [
  { name: "Alexandra Deff", workingOn: "Otimização de Grafo", avatar: "AD" },
  { name: "Edwin Adenike", workingOn: "Desafio de Trie", avatar: "EA" },
  { name: "Lucas Mendes", workingOn: "Segment Tree", avatar: "LM" },
  { name: "Yuki Tanaka", workingOn: "Fluxo Máximo", avatar: "YT" },
];

export const mockTopicProgress = [
  { name: "Array & Strings", value: 40 },
  { name: "Árvores", value: 30 },
  { name: "Programação Dinâmica", value: 18 },
  { name: "Grafos", value: 12 },
];

export const mockCurrentChallenge = {
  title: "Palíndromo Mais Longo",
  time: "01:24:08",
  language: "JavaScript",
  difficulty: "Médio",
};
