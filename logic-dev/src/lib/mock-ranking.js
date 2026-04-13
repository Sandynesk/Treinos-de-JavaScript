const avatars = ["👨‍💻", "👩‍💻", "🦊", "🚀", "🐱‍👤", "⚡", "👾", "🤖", "🐉", "🦉"];
const firstNames = ["Alice", "Bob", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Helena", "Igor", "Julia", "Lucas", "Mariana", "Nicolas", "Olivia", "Pedro"];
const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Mendes"];

const generateMockRanking = () => {
  const ranking = [];
  let currentPoints = 15000;

  for (let i = 1; i <= 100; i++) {
    // Math.sin for deterministic pseudo-random generation to avoid Next.js hydration mismatch
    const fIdx = Math.floor(Math.abs(Math.sin(i * 12.3) * 100)) % firstNames.length;
    const lIdx = Math.floor(Math.abs(Math.sin(i * 4.5) * 100)) % lastNames.length;
    const aIdx = Math.floor(Math.abs(Math.sin(i * 8.9) * 100)) % avatars.length;
    
    const drop = Math.floor(Math.abs(Math.sin(i * 7.1) * 200)) + 10;
    currentPoints -= drop;

    const streak = Math.floor(Math.abs(Math.sin(i * 3.3) * 50));
    const solved = Math.floor(Math.abs(Math.sin(i * 2.1) * 300)) + 20;

    ranking.push({
      id: i,
      position: i,
      name: `${firstNames[fIdx]} ${lastNames[lIdx]}`,
      points: currentPoints,
      streak: streak,
      solved: solved,
      avatar: avatars[aIdx]
    });
  }

  // Force specific data for the current user mock (position 47) as requested
  ranking[46] = {
    id: 47,
    position: 47,
    name: "Você (CodeMaster)",
    points: ranking[45].points - 10,
    streak: 5,
    solved: 34,
    avatar: "😎"
  };

  return ranking;
};

export const mockRankingData = generateMockRanking();

export const mockUserPosition = {
  position: 47,
  name: "Você",
  points: 1280, // User requested static sample points, but we'll adapt to not break table sorting
  streak: 5,
  solved: 34,
  avatar: "😎"
};
