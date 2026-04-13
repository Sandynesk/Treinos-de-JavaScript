export default function ExercisesLayout({ children }) {
  return (
    <>
      {/* Efeitos de Iluminação de Fundo (Glows) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[100px] opacity-60" />
        <div className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/10 blur-[120px] opacity-50" />
        <div className="absolute -bottom-[10%] left-[10%] w-[60vw] h-[40vw] rounded-full bg-zinc-800/30 blur-[100px] opacity-40" />
      </div>
      {children}
    </>
  );
}
