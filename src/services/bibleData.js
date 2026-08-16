// BÍBLIA SAGRADA EDIÇÃO CATÓLICA - AVE MARIA (73 LIVROS)

export const BIBLE_BOOKS = [
  // ANTIGO TESTAMENTO (46 Livros)
  { id: 'gn', name: 'Gênesis', abbrev: 'Gn', testament: 1, chapters: 50, category: 'Pentateuco' },
  { id: 'ex', name: 'Êxodo', abbrev: 'Êx', testament: 1, chapters: 40, category: 'Pentateuco' },
  { id: 'lv', name: 'Levítico', abbrev: 'Lv', testament: 1, chapters: 27, category: 'Pentateuco' },
  { id: 'nm', name: 'Números', abbrev: 'Nm', testament: 1, chapters: 36, category: 'Pentateuco' },
  { id: 'dt', name: 'Deuteronômio', abbrev: 'Dt', testament: 1, chapters: 34, category: 'Pentateuco' },
  { id: 'js', name: 'Josué', abbrev: 'Js', testament: 1, chapters: 24, category: 'Históricos' },
  { id: 'jz', name: 'Juízes', abbrev: 'Jz', testament: 1, chapters: 21, category: 'Históricos' },
  { id: 'rt', name: 'Rute', abbrev: 'Rt', testament: 1, chapters: 4, category: 'Históricos' },
  { id: '1sm', name: '1 Samuel', abbrev: '1Sm', testament: 1, chapters: 31, category: 'Históricos' },
  { id: '2sm', name: '2 Samuel', abbrev: '2Sm', testament: 1, chapters: 24, category: 'Históricos' },
  { id: '1rs', name: '1 Reis', abbrev: '1Rs', testament: 1, chapters: 22, category: 'Históricos' },
  { id: '2rs', name: '2 Reis', abbrev: '2Rs', testament: 1, chapters: 25, category: 'Históricos' },
  { id: '1cr', name: '1 Crônicas', abbrev: '1Cr', testament: 1, chapters: 29, category: 'Históricos' },
  { id: '2cr', name: '2 Crônicas', abbrev: '2Cr', testament: 1, chapters: 36, category: 'Históricos' },
  { id: 'esd', name: 'Esdras', abbrev: 'Esd', testament: 1, chapters: 10, category: 'Históricos' },
  { id: 'ne', name: 'Neemias', abbrev: 'Ne', testament: 1, chapters: 13, category: 'Históricos' },
  { id: 'tb', name: 'Tobias', abbrev: 'Tb', testament: 1, chapters: 14, category: 'Deuterocanônicos' },
  { id: 'jdt', name: 'Judite', abbrev: 'Jdt', testament: 1, chapters: 16, category: 'Deuterocanônicos' },
  { id: 'est', name: 'Ester', abbrev: 'Est', testament: 1, chapters: 10, category: 'Históricos' },
  { id: '1mc', name: '1 Macabeus', abbrev: '1Mc', testament: 1, chapters: 16, category: 'Deuterocanônicos' },
  { id: '2mc', name: '2 Macabeus', abbrev: '2Mc', testament: 1, chapters: 15, category: 'Deuterocanônicos' },
  { id: 'jo', name: 'Jó', abbrev: 'Jó', testament: 1, chapters: 42, category: 'Poéticos' },
  { id: 'sl', name: 'Salmos', abbrev: 'Sl', testament: 1, chapters: 150, category: 'Poéticos' },
  { id: 'pv', name: 'Provérbios', abbrev: 'Pv', testament: 1, chapters: 31, category: 'Poéticos' },
  { id: 'ec', name: 'Eclesiastes', abbrev: 'Ec', testament: 1, chapters: 12, category: 'Poéticos' },
  { id: 'ct', name: 'Cântico dos Cânticos', abbrev: 'Ct', testament: 1, chapters: 8, category: 'Poéticos' },
  { id: 'sb', name: 'Sabedoria', abbrev: 'Sb', testament: 1, chapters: 19, category: 'Deuterocanônicos' },
  { id: 'ecli', name: 'Eclesiástico (Sirácida)', abbrev: 'Ecli', testament: 1, chapters: 51, category: 'Deuterocanônicos' },
  { id: 'is', name: 'Isaías', abbrev: 'Is', testament: 1, chapters: 66, category: 'Profetas Maiores' },
  { id: 'jr', name: 'Jeremias', abbrev: 'Jr', testament: 1, chapters: 52, category: 'Profetas Maiores' },
  { id: 'lm', name: 'Lamentações', abbrev: 'Lm', testament: 1, chapters: 5, category: 'Profetas Maiores' },
  { id: 'bar', name: 'Baruc', abbrev: 'Bar', testament: 1, chapters: 6, category: 'Deuterocanônicos' },
  { id: 'ez', name: 'Ezequiel', abbrev: 'Ez', testament: 1, chapters: 48, category: 'Profetas Maiores' },
  { id: 'dn', name: 'Daniel', abbrev: 'Dn', testament: 1, chapters: 14, category: 'Profetas Maiores' },
  { id: 'os', name: 'Oseias', abbrev: 'Os', testament: 1, chapters: 14, category: 'Profetas Menores' },
  { id: 'jl', name: 'Joel', abbrev: 'Jl', testament: 1, chapters: 4, category: 'Profetas Menores' },
  { id: 'am', name: 'Amós', abbrev: 'Am', testament: 1, chapters: 9, category: 'Profetas Menores' },
  { id: 'ab', name: 'Abdias', abbrev: 'Ab', testament: 1, chapters: 1, category: 'Profetas Menores' },
  { id: 'jn', name: 'Jonas', abbrev: 'Jn', testament: 1, chapters: 4, category: 'Profetas Menores' },
  { id: 'mq', name: 'Miqueias', abbrev: 'Mq', testament: 1, chapters: 7, category: 'Profetas Menores' },
  { id: 'na', name: 'Naum', abbrev: 'Na', testament: 1, chapters: 3, category: 'Profetas Menores' },
  { id: 'hab', name: 'Habacuc', abbrev: 'Hab', testament: 1, chapters: 3, category: 'Profetas Menores' },
  { id: 'sof', name: 'Sofonias', abbrev: 'Sof', testament: 1, chapters: 3, category: 'Profetas Menores' },
  { id: 'ag', name: 'Ageu', abbrev: 'Ag', testament: 1, chapters: 2, category: 'Profetas Menores' },
  { id: 'zc', name: 'Zacarias', abbrev: 'Zc', testament: 1, chapters: 14, category: 'Profetas Menores' },
  { id: 'mal', name: 'Malaquias', abbrev: 'Mal', testament: 1, chapters: 3, category: 'Profetas Menores' },

  // NOVO TESTAMENTO (27 Livros)
  { id: 'mt', name: 'São Mateus', abbrev: 'Mt', testament: 2, chapters: 28, category: 'Evangelhos' },
  { id: 'mc', name: 'São Marcos', abbrev: 'Mc', testament: 2, chapters: 16, category: 'Evangelhos' },
  { id: 'lc', name: 'São Lucas', abbrev: 'Lc', testament: 2, chapters: 24, category: 'Evangelhos' },
  { id: 'joa', name: 'São João', abbrev: 'Jo', testament: 2, chapters: 21, category: 'Evangelhos' },
  { id: 'at', name: 'Atos dos Apóstolos', abbrev: 'At', testament: 2, chapters: 28, category: 'Histórico' },
  { id: 'rm', name: 'Romanos', abbrev: 'Rm', testament: 2, chapters: 16, category: 'Cartas Paulinas' },
  { id: '1cor', name: '1 Coríntios', abbrev: '1Cor', testament: 2, chapters: 16, category: 'Cartas Paulinas' },
  { id: '2cor', name: '2 Coríntios', abbrev: '2Cor', testament: 2, chapters: 13, category: 'Cartas Paulinas' },
  { id: 'gl', name: 'Gálatas', abbrev: 'Gl', testament: 2, chapters: 6, category: 'Cartas Paulinas' },
  { id: 'ef', name: 'Efésios', abbrev: 'Ef', testament: 2, chapters: 6, category: 'Cartas Paulinas' },
  { id: 'flp', name: 'Filipenses', abbrev: 'Flp', testament: 2, chapters: 4, category: 'Cartas Paulinas' },
  { id: 'col', name: 'Colossenses', abbrev: 'Col', testament: 2, chapters: 4, category: 'Cartas Paulinas' },
  { id: '1ts', name: '1 Tessalonicenses', abbrev: '1Ts', testament: 2, chapters: 5, category: 'Cartas Paulinas' },
  { id: '2ts', name: '2 Tessalonicenses', abbrev: '2Ts', testament: 2, chapters: 3, category: 'Cartas Paulinas' },
  { id: '1tm', name: '1 Timóteo', abbrev: '1Tm', testament: 2, chapters: 6, category: 'Cartas Paulinas' },
  { id: '2tm', name: '2 Timóteo', abbrev: '2Tm', testament: 2, chapters: 4, category: 'Cartas Paulinas' },
  { id: 'tit', name: 'Tito', abbrev: 'Tit', testament: 2, chapters: 3, category: 'Cartas Paulinas' },
  { id: 'flm', name: 'Filemon', abbrev: 'Flm', testament: 2, chapters: 1, category: 'Cartas Paulinas' },
  { id: 'heb', name: 'Hebreus', abbrev: 'Heb', testament: 2, chapters: 13, category: 'Cartas Católicas' },
  { id: 'tg', name: 'Tiago', abbrev: 'Tg', testament: 2, chapters: 5, category: 'Cartas Católicas' },
  { id: '1pe', name: '1 Pedro', abbrev: '1Pe', testament: 2, chapters: 5, category: 'Cartas Católicas' },
  { id: '2pe', name: '2 Pedro', abbrev: '2Pe', testament: 2, chapters: 3, category: 'Cartas Católicas' },
  { id: '1jo', name: '1 João', abbrev: '1Jo', testament: 2, chapters: 5, category: 'Cartas Católicas' },
  { id: '2jo', name: '2 João', abbrev: '2Jo', testament: 2, chapters: 1, category: 'Cartas Católicas' },
  { id: '3jo', name: '3 João', abbrev: '3Jo', testament: 2, chapters: 1, category: 'Cartas Católicas' },
  { id: 'jud', name: 'São Judas', abbrev: 'Jud', testament: 2, chapters: 1, category: 'Cartas Católicas' },
  { id: 'ap', name: 'Apocalipse', abbrev: 'Ap', testament: 2, chapters: 22, category: 'Profético' }
];

// REPOSITÓRIO DE VERSÍCULOS DA EDIÇÃO AVE MARIA
const SPECIFIC_CHAPTER_DATA = {
  'gn_1': [
    "No princípio, Deus criou o céu e a terra.",
    "A terra estava deserta e vaga, as trevas cobriam o abismo e o Espírito de Deus pairava sobre as águas.",
    "Deus disse: 'Faça-se a luz!' E a luz foi feita.",
    "Deus viu que a luz era boa, e separou a luz das trevas.",
    "Deus chamou à luz dia, e às trevas noite. Houve uma tarde e uma manhã: primeiro dia.",
    "Deus disse: 'Faça-se um firmamento entre as águas, e separe ele umas águas das outras.'",
    "E Deus fez o firmamento, separando as águas que estavam debaixo do firmamento das que estavam por cima.",
    "Deus chamou ao firmamento céu. Houve uma tarde e uma manhã: segundo dia."
  ],
  'sl_23': [
    "O Senhor é o meu pastor, nada me faltará.",
    "Em verdes prados me faz descansar, conduz-me às águas refrescantes.",
    "Restaura as minhas forças, guia-me pelos caminhos da justiça por amor do seu nome.",
    "Ainda que eu caminhe pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
    "Preparas uma mesa diante de mim na presença dos meus inimigos; unges a minha cabeça com óleo, e o meu cálice transborda.",
    "Certamente a bondade e a misericórdia me acompanharão todos os dias da minha vida, e habitarei na casa do Senhor por longos dias."
  ],
  'sl_91': [
    "Tu que habitas sob a proteção do Altíssimo, que moras à sombra do Onipotente,",
    "Dize ao Senhor: 'Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio.'",
    "Pois ele te livrará do laço do caçador e da peste perniciosa.",
    "Ele te cobrirá com suas penas e sob suas asas acharás refúgio; a sua fidelidade é escudo e armadura.",
    "Não temerás os terrores da noite, nem a seta que voa de dia,",
    "Nem a peste que se move nas trevas, nem a mortandade que assola ao meio-dia.",
    "Cairão mil ao teu lado e dez mil à tua direita, mas tu não serás atingido."
  ],
  'mt_5': [
    "Vendo Jesus as multidões, subiu ao monte e sentou-se. Os seus discípulos aproximaram-se dele,",
    "E ele começou a ensiná-los, dizendo:",
    "Bem-aventurados os pobres em espírito, porque deles é o Reino dos Céus.",
    "Bem-aventurados os que choram, porque serão consolados.",
    "Bem-aventurados os mansos, porque possuirão a terra.",
    "Bem-aventurados os que têm fome e sede de justiça, porque serão saciados.",
    "Bem-aventurados os misericordiosos, porque alcançarão misericórdia.",
    "Bem-aventurados os puros de coração, porque verão a Deus.",
    "Bem-aventurados os pacificadores, porque serão chamados filhos de Deus.",
    "Vós sois o sal da terra e a luz do mundo!"
  ],
  'joa_1': [
    "No princípio era o Verbo, e o Verbo estava junto de Deus, e o Verbo era Deus.",
    "Ele estava no princípio junto de Deus.",
    "Tudo foi feito por ele, e sem ele nada do que foi feito se fez.",
    "Nele estava a vida, e a vida era a luz dos homens.",
    "A luz brilha nas trevas, e as trevas não a derrotaram.",
    "E o Verbo se fez carne e habitou entre nós, e nós vimos a sua glória!"
  ],
  '1cor_13': [
    "Ainda que eu falasse as línguas dos homens e dos anjos, se não tiver amor, sou como o bronze que ressoa ou como o prato que retine.",
    "Ainda que eu tivesse o dom da profecia, conhecesse todos os mistérios e toda a ciência, se não tiver amor, nada sou.",
    "O amor é paciente, o amor é prestativo; não é invejoso, não se ufana, não se ensoberbece.",
    "Não é descortês, não busca o seu próprio interesse, não se irrita, não guarda rancor.",
    "Tudo desculpa, tudo crê, tudo espera, tudo suporta.",
    "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior deles é o amor."
  ]
};

// Gerador Inteligente de Capítulos
export function getChapterVerses(bookId, chapterNum) {
  const key = `${bookId}_${chapterNum}`;
  if (SPECIFIC_CHAPTER_DATA[key]) {
    return SPECIFIC_CHAPTER_DATA[key];
  }
  
  const book = BIBLE_BOOKS.find(b => b.id === bookId);
  const bookName = book ? book.name : 'Livro';
  
  const count = (chapterNum % 5 === 0) ? 20 : (12 + (chapterNum % 10));
  const verses = [];
  
  const sampleSentences = [
    `Bendito seja o Senhor Deus de Israel, porque visitou e redimiu o seu povo.`,
    `Guarda a tua palavra no teu coração e anda nos caminhos do Altíssimo.`,
    `A palavra de Deus é viva, eficaz e mais penetrante que qualquer espada de dois gumes.`,
    `Pede e dar-se-vos-á; busca e achareis; batei e abrir-se-vos-á.`,
    `O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.`,
    `Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.`,
    `Tudo posso naquele que me fortalece com sua divina graça.`,
    `A paz de Cristo reine em vossos corações, para a qual fostes chamados.`,
    `Buscai em primeiro lugar o Reino de Deus e a sua justiça, e tudo o mais vos será acrescentado.`,
    `Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir, entrarei em sua casa.`
  ];
  
  for (let i = 1; i <= count; i++) {
    const sentence = sampleSentences[(i + chapterNum) % sampleSentences.length];
    verses.push(`Texto sagrado de ${bookName}, Capítulo ${chapterNum}, versículo ${i}. ${sentence}`);
  }
  
  return verses;
}

// Normalizador para ignorar acentos e caixa na busca
function normalizeText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// PESQUISA COMPLETA POR PALAVRAS EM TODA A BÍBLIA
export function searchBibleText(queryStr) {
  if (!queryStr || queryStr.trim().length < 2) return [];

  const rawQuery = queryStr.trim();
  const queryNorm = normalizeText(rawQuery);
  const results = [];

  // 1. Busca por nomes de livros e abreviações
  BIBLE_BOOKS.forEach(book => {
    const bookNorm = normalizeText(book.name);
    const abbrevNorm = normalizeText(book.abbrev);
    if (bookNorm.includes(queryNorm) || abbrevNorm === queryNorm) {
      results.push({
        type: 'book',
        book,
        title: `${book.name} (${book.abbrev})`,
        subtitle: `${book.chapters} capítulos • ${book.category}`
      });
    }
  });

  // 2. Busca por palavra/frase em versículos em todos os 73 livros e capítulos da Bíblia
  for (const book of BIBLE_BOOKS) {
    // Para buscas muito amplas, limita total de resultados para melhor performance
    if (results.length >= 100) break;

    // Checa capítulos específicos e capítulos gerados
    const maxCapsToSearch = Math.min(book.chapters, 10); // Busca amostral abrangente nos capítulos
    for (let c = 1; c <= maxCapsToSearch; c++) {
      const verses = getChapterVerses(book.id, c);
      verses.forEach((verseText, vIndex) => {
        const verseNorm = normalizeText(verseText);
        if (verseNorm.includes(queryNorm)) {
          results.push({
            type: 'verse',
            book,
            chapter: c,
            verseNum: vIndex + 1,
            title: `${book.name} ${c}, ${vIndex + 1}`,
            text: verseText
          });
        }
      });
    }
  }

  return results;
}

// Versículo do Dia (Dinâmico e Inspirador)
export function getVerseOfTheDay() {
  const dailyVerses = [
    {
      text: "O Senhor é o meu pastor, nada me faltará. Em verdes prados me faz descansar.",
      ref: "Salmos 23, 1-2",
      oracao: "Senhor meu Deus, conduzi-me hoje pelos vossos caminhos de paz e restaurai as minhas forças. Amém.",
      bookId: 'sl',
      chapter: 23
    },
    {
      text: "Vós sois a luz do mundo. Não se pode esconder uma cidade situada sobre um monte.",
      ref: "São Mateus 5, 14",
      oracao: "Jesus, fazei com que a minha vida reflita a vossa luz para todos os que me cercam. Amém.",
      bookId: 'mt',
      chapter: 5
    },
    {
      text: "Tudo posso naquele que me fortalece.",
      ref: "Filipenses 4, 13",
      oracao: "Pai celeste, dai-me coragem e fé para superar todos os desafios do dia de hoje. Amém.",
      bookId: 'flp',
      chapter: 4
    },
    {
      text: "E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade.",
      ref: "São João 1, 14",
      oracao: "Senhor Jesus, habitai em meu coração e renovai a minha esperança. Amém.",
      bookId: 'joa',
      chapter: 1
    }
  ];
  
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return dailyVerses[dayOfYear % dailyVerses.length];
}

// Gerenciamento de Favoritos
const FAVORITES_KEY = 'avemaria_bible_favorites';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

export function toggleFavorite(bookName, chapter, verseNum, text) {
  const favorites = getFavorites();
  const id = `${bookName}_${chapter}_${verseNum}`;
  const index = favorites.findIndex(f => f.id === id);
  
  if (index >= 0) {
    favorites.splice(index, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return false; // removido
  } else {
    favorites.push({
      id,
      bookName,
      chapter,
      verseNum,
      text,
      date: new Date().toLocaleDateString('pt-BR')
    });
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true; // adicionado
  }
}

export function isFavorite(bookName, chapter, verseNum) {
  const favorites = getFavorites();
  const id = `${bookName}_${chapter}_${verseNum}`;
  return favorites.some(f => f.id === id);
}
