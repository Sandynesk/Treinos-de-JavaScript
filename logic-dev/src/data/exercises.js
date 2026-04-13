export const EXERCISES = [
  {
    id: 1,
    icon: 'fa-arrows-left-right',
    title: 'Inversão de String',
    difficulty: 'Fácil',
    difficultyKey: 'easy',
    fnName: 'inverterString',
    description:
      'Crie uma função que recebe uma string e a retorna completamente invertida, sem usar métodos nativos como <code>.reverse()</code>.',
    constraints: [
      'Não utilize <code>.split().reverse().join()</code>.',
      'A função deve ser pura — sem efeitos colaterais.',
      'Considere strings com qualquer tipo de caractere.',
    ],
    examples: [
      { input: 'inverterString("hello")', output: '"olleh"' },
      { input: 'inverterString("JavaScript")', output: '"tpircSavaJ"' },
    ],
    testCases: [
      { args: ['hello'], expected: 'olleh', label: 'Teste 1: "hello" → "olleh"' },
      { args: ['JavaScript'], expected: 'tpircSavaJ', label: 'Teste 2: "JavaScript" → "tpircSavaJ"' },
      { args: [''], expected: '', label: 'Teste 3: string vazia' },
      { args: ['a'], expected: 'a', label: 'Teste 4: carácter único' },
    ],
    hint: 'Tente percorrer a string de trás para frente, concatenando cada caractere em uma nova variável.',
    solution: `function inverterString(str) {
  let resultado = "";
  for (let i = str.length - 1; i >= 0; i--) {
    resultado += str[i];
  }
  return resultado;
}`,
    starter: `function inverterString(str) {
  // Seu código aqui

}

// Teste
console.log(inverterString("hello")); // "olleh"`,
  },

  {
    icon: 'fa-infinity',
    id: 2,
    title: 'Validador de Anagramas',
    difficulty: 'Médio',
    difficultyKey: 'medium',
    fnName: 'isAnagram',
    description:
      'Verifique se duas palavras fornecidas são anagramas exatos uma da outra. A verificação deve ser case-insensitive e ignorar espaços extras.',
    constraints: [
      'A comparação deve ignorar maiúsculas/minúsculas.',
      'Espaços em branco devem ser removidos antes da comparação.',
      'Retorne um valor booleano.',
    ],
    examples: [
      { input: 'isAnagram("listen", "silent")', output: 'true' },
      { input: 'isAnagram("hello", "world")', output: 'false' },
    ],
    testCases: [
      { args: ['listen', 'silent'], expected: true, label: 'Teste 1: "listen" / "silent"' },
      { args: ['hello', 'world'], expected: false, label: 'Teste 2: "hello" / "world"' },
      { args: ['Astronomer', 'Moon starer'], expected: true, label: 'Teste 3: ignora espaços' },
      { args: ['rat', 'car'], expected: false, label: 'Teste 4: "rat" / "car"' },
    ],
    hint: 'Remova os espaços, converta para minúsculo, ordene os caracteres e compare as duas strings resultantes.',
    solution: `function isAnagram(a, b) {
  const format = (str) => str.replace(/\\s+/g, "").toLowerCase().split("").sort().join("");
  return format(a) === format(b);
}`,
    starter: `function isAnagram(a, b) {
  // Seu código aqui

}

// Teste
console.log(isAnagram("listen", "silent")); // true`,
  },

  {
    id: 3,
    icon: 'fa-route',
    title: 'Caminho mais curto (Dijkstra)',
    difficulty: 'Difícil',
    difficultyKey: 'hard',
    fnName: 'dijkstra',
    description:
      'Implemente o algoritmo de Dijkstra para encontrar o caminho de menor custo entre dois nós em um grafo ponderado e não-direcionado.',
    constraints: [
      'O grafo é representado como lista de adjacência.',
      'Todos os pesos de arestas são inteiros positivos.',
      'Retorne tanto a distância mínima quanto o caminho percorrido.',
    ],
    examples: [
      {
        input: 'dijkstra(graph, "A", "C")',
        output: '{ distance: 3, path: ["A","B","C"] }',
      },
    ],
    testCases: [
      {
        args: [
          { A: [{ node: 'B', weight: 1 }], B: [{ node: 'A', weight: 1 }, { node: 'C', weight: 2 }], C: [{ node: 'B', weight: 2 }] },
          'A', 'C',
        ],
        expected: { distance: 3, path: ['A', 'B', 'C'] },
        label: 'Teste 1: A → C peso 3',
      },
    ],
    hint: 'Use um objeto para rastrear as distâncias mínimas de cada nó a partir do início e outro para rastrear os nós anteriores.',
    solution: `function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const nodes = new Set();

  for (let node in graph) {
    distances[node] = node === start ? 0 : Infinity;
    nodes.add(node);
  }

  while (nodes.size > 0) {
    let closestNode = null;
    for (let node of nodes) {
      if (closestNode === null || distances[node] < distances[closestNode]) {
        closestNode = node;
      }
    }

    if (distances[closestNode] === Infinity || closestNode === end) break;

    nodes.delete(closestNode);

    for (let neighbor of graph[closestNode]) {
      let alt = distances[closestNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = closestNode;
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return { distance: distances[end], path };
}`,
    starter: `function dijkstra(graph, start, end) {
  // Seu código aqui
  // graph = { A: [{node:"B",weight:1}], B: [{node:"A",weight:1},{node:"C",weight:2}], ... }

}

// Teste
const graph = {
  A: [{ node: "B", weight: 1 }],
  B: [{ node: "A", weight: 1 }, { node: "C", weight: 2 }],
  C: [{ node: "B", weight: 2 }],
};
console.log(dijkstra(graph, "A", "C"));`,
  },
  {
    id: 4,
    icon: 'fa-bullseye',
    title: 'Two Sum',
    difficulty: 'Fácil',
    difficultyKey: 'easy',
    fnName: 'twoSum',
    description:
      'Dado um array de inteiros <code>nums</code> e um número inteiro <code>target</code>, retorne os índices dos dois números cuja soma seja igual ao <code>target</code>. Você pode assumir que cada entrada terá exatamente uma solução e não poderá usar o mesmo elemento duas vezes.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Apenas uma solução válida existe.'
    ],
    examples: [
      { input: 'twoSum([2,7,11,15], 9)', output: '[0, 1]' },
      { input: 'twoSum([3,2,4], 6)', output: '[1, 2]' },
      { input: 'twoSum([3,3], 6)', output: '[0, 1]' },
    ],
    testCases: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1], label: 'Teste 1: [2,7,11,15], target 9 → [0,1]' },
      { args: [[3, 2, 4], 6], expected: [1, 2], label: 'Teste 2: [3,2,4], target 6 → [1,2]' },
      { args: [[3, 3], 6], expected: [0, 1], label: 'Teste 3: [3,3], target 6 → [0,1]' },
    ],
    hint: 'Tente usar um Map para armazenar o valor e seu índice enquanto percorre o array. Assim, você pode verificar se o complemento (target - nums[i]) já existe no Map.',
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
    starter: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Seu código aqui

}

// Teste
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
  },
  {
    id: 5,
    icon: 'fa-arrows-left-right',
    title: 'Palindrome Number',
    difficulty: 'Fácil',
    difficultyKey: 'easy',
    fnName: 'isPalindrome',
    description:
      'Dado um número inteiro <code>x</code>, retorne <code>true</code> se <code>x</code> for um palíndromo e <code>false</code> caso contrário.<br><br>Um número é palíndromo quando lido da mesma forma da esquerda para a direita e da direita para a esquerda.',
    constraints: [
      '-2^31 <= x <= 2^31 - 1',
      '<strong>Follow up:</strong> Você poderia resolvê-lo sem converter o número inteiro em uma string?'
    ],
    examples: [
      { input: 'isPalindrome(121)', output: 'true' },
      { input: 'isPalindrome(-121)', output: 'false' },
      { input: 'isPalindrome(10)', output: 'false' },
    ],
    testCases: [
      { args: [121], expected: true, label: 'Teste 1: x = 121' },
      { args: [-121], expected: false, label: 'Teste 2: x = -121' },
      { args: [10], expected: false, label: 'Teste 3: x = 10' },
      { args: [1221], expected: true, label: 'Teste 4: x = 1221' }
    ],
    hint: 'Para transformar em string, você pode usar .toString() e inverter seus caracteres.',
    solution: `var isPalindrome = function(x) {
    let res = false;
    let text = x.toString();
    const listinvert = [];

    for (let i = text.length - 1; i >= 0; i--) {
        listinvert.push(text[i]);
    }

    let textoInvertido = listinvert.join('');

    if (text === textoInvertido) {
        return true;
    } else {
        return false;
    }
};`,
    starter: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // Seu código aqui

};

// Teste
console.log(isPalindrome(121)); // true`,
  },
  {
    id: 6,
    icon: 'fa-landmark',
    title: 'Roman to Integer',
    difficulty: 'Fácil',
    difficultyKey: 'easy',
    fnName: 'romanToInt',
    description:
      'Dado um número romano <code>s</code>, converta-o para um número inteiro.<br><br>Os numerais romanos são representados por sete símbolos diferentes: I, V, X, L, C, D e M.',
    constraints: [
      '1 <= s.length <= 15',
      '<code>s</code> contém apenas os caracteres (\'I\', \'V\', \'X\', \'L\', \'C\', \'D\', \'M\').',
      'É garantido que <code>s</code> é um número romano válido no intervalo [1, 3999].'
    ],
    examples: [
      { input: 'romanToInt("III")', output: '3' },
      { input: 'romanToInt("LVIII")', output: '58' },
      { input: 'romanToInt("MCMXCIV")', output: '1994' },
    ],
    testCases: [
      { args: ['III'], expected: 3, label: 'Teste 1: s = "III"' },
      { args: ['LVIII'], expected: 58, label: 'Teste 2: s = "LVIII"' },
      { args: ['MCMXCIV'], expected: 1994, label: 'Teste 3: s = "MCMXCIV"' }
    ],
    hint: 'Os números romanos geralmente são escritos do maior para o menor. No entanto, se um caractere representar um valor menor que o caractere à sua direita, você deve subtraí-lo.',
    solution: `var romanToInt = function(s) {
    let result = 0;

    const valorDe = (l) => {
        if (l === "M") return 1000;
        if (l === "D") return 500;
        if (l === "C") return 100;
        if (l === "L") return 50;
        if (l === "X") return 10;
        if (l === "V") return 5;
        if (l === "I") return 1;
        return 0;
    };

    for (let i = 0; i < s.length; i++) {
        let atual = valorDe(s[i]);
        let prox = valorDe(s[i+1]);

       if (atual < prox) {
        result -= atual;
       } else {
        result += atual;
       }
    }

    return result;
};`,
    starter: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    // Seu código aqui

};

// Teste
console.log(romanToInt("MCMXCIV")); // 1994`,
  },
];
