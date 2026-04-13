# Plano: Melhorar Design da Página de Cadastro

## Contexto
A página de Login (`src/app/Auth/Login/page.js`) possui um design moderno e sofisticado com:
- Background effects (blur circles, grid pattern)
- Glassmorphism no card do formulário
- Efeitos visuais (shine, glow, gradientes)
- Inputs com ícones e estados hover/focus aprimorados
- Botões com gradiente, loading state e transições suaves
- Responsividade bem trabalhada

A página de Cadastro está com design básico e desalinhado visualmente.

## Objetivos
1. Aplicar o mesmo nível de sofisticação visual da página Login
2. Garantir responsividade mobile-first
3. Adicionar animações e efeitos visuais de alta qualidade
4. Manter consistência com a identidade da marca (roxo, fundo escuro, fonte Syne)

## Arquivos a Modificar
- `src/app/Auth/Cadastro/page.js` - Apenas este arquivo

## Mudanças Implementadas

### 1. Background Effects
- Adicionar blur circles (iguais ao Login)
- Adicionar grid pattern overlay sutil
- Manter o header with backdrop blur

### 2. Form Container
- Mudar de fundo sólido para `bg-zinc-900/40` (glassmorphism)
- Adicionar `backdrop-blur-xl`
- Borda semi-transparente `border-zinc-800/60`
- Adicionar shine effect no topo (h-px gradiente)
- Adicionar glow atrás do formulário
- Aumentar padding internamente com `p-8`

### 3. Inputs
- Adicionar ícone no label (email: envelope, password: lock, name: user)
- Melhorar states: `group-hover:border-zinc-700`, `focus:ring-1 focus:ring-purple-500/30`
- Ajustar border radius para `rounded-xl` (em vez de `rounded-lg`)
- Adicionar transição `duration-300`
- Ajustar padding para `py-3.5`

### 4. Password Toggle
- Estilizar botão com hover effect para texto roxo
- Adicionar ícone no lado direito do input

### 5. Checkbox
- Customizar checkbox com estilo moderno (igual ao Login)
- Checkbox escondido (sr-only) + div customizado
- Checked state: bg-purple-600, ícone check aparece
- Animações suaves

### 6. Botão Submit
- Usar gradiente: `bg-gradient-to-r from-purple-600 to-purple-700`
- Hover: `hover:from-purple-500 hover:to-purple-600`
- Adicionar shadow: `shadow-lg shadow-purple-900/30`, hover: `shadow-purple-600/40`
- Adicionar loading state com spinner
- Adicionar shine effect: `via-white/10` overlay que desliza no hover
- Efeito de overflow hidden + group/btn

### 7. Social Signup
- Estilizar botão igual ao Login: borda, hover states, ícone com scale no hover

### 8. Elementos Decorativos
- Adicionar badge antes do título (como no Login)
- Adicionar divisores com gradiente (transparent→zinc→transparent)
- Adicionar bolinhas decorativas no final (iguais ao Login)
- Título com gradiente opcional (manter texto simples como no Login atual)

### 9. Responsividade Mobile
- Verificar padding em telas pequenas: reduzir para `px-4` se necessário
- Ajustar max-width do formulário
- Garantir que botões tenham touch-friendly size (mínimo 44px altura)
- Testar em viewport mobile

## Verificação
1. Executar aplicação: `npm run dev`
2. Abrir `/Auth/Cadastro` em desktop e mobile
3. Testar estados: hover, focus, loading
4. Verificar consistência visual com página Login
5. Testar toggle de senha
6. Validação de formulário (coincidência de senhas)
