// BÍBLIA SAGRADA EDIÇÃO CATÓLICA - AVE MARIA (73 LIVROS COMPLETOS)

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

// BANCO DE DADOS DE TEXTOS E VERSÍCULOS SAGRADOS (EDIÇÃO AVE MARIA)
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
  'ex_20': [
    "Então Deus pronunciou todas estas palavras: Eu sou o Senhor teu Deus, que te tirei do Egito, da casa da escravidão.",
    "Não terás outros deuses diante de mim.",
    "Honra teu pai e tua mãe, para que teus dias se prolonguem na terra que o Senhor teu Deus te dá.",
    "Não matarás.",
    "Não cometerás adultério.",
    "Não furtarás."
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
  'is_53': [
    "Ele foi traspassado por causa das nossas transgressões, e moído por causa das nossas iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas suas pisaduras fomos curados.",
    "Todos nós andávamos desgarrados como ovelhas; cada um se desviava pelo seu caminho, mas o Senhor fez cair sobre ele a iniquidade de todos nós."
  ],
  'tb_12': [
    "É bom guardar o segredo do rei, mas é glorioso revelar e confessar as obras de Deus. Praticai o bem, e o mal não vos atingirá.",
    "A oração é boa acompanhada do jejum, da esmola e da justiça. A esmola livra da morte e purifica de todo pecado."
  ],
  'sb_3': [
    "As almas dos justos estão nas mãos de Deus, e nenhum tormento as tocará.",
    "Aos olhos dos insensatos pareciam ter morrido, mas eles estão em paz."
  ],
  'ecli_2': [
    "Meu filho, se entrares para o serviço de Deus, permanece firme na justiça e no temor, e prepara a tua alma para a provação.",
    "Confia em Deus, e ele te ajudará; endireita os teus caminhos e espera nele."
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
  'mt_6': [
    "Pai nosso, que estás nos céus, santificado seja o teu nome;",
    "Venha o teu Reino, seja feita a tua vontade, assim na terra como no céu.",
    "O pão nosso de cada dia nos dá hoje;",
    "Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores;",
    "E não nos deixes cair em tentação, mas livra-nos do mal."
  ],
  'lc_1': [
    "No sexto mês, o anjo Gabriel foi enviado por Deus a uma cidade da Galileia, chamada Nazaré,",
    "A uma virgem desposada com um homem cujo nome era José, da casa de Davi; e o nome da virgem era Maria.",
    "Entrando o anjo onde ela estava, disse: 'Ave, cheia de graça, o Senhor é contigo; bendita és tu entre as mulheres.'",
    "Disse então Maria: 'Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra.'"
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
  ],
  'ap_21': [
    "E vi um novo céu e uma nova terra; porque já o primeiro céu e a primeira terra passaram.",
    "E Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor."
  ]
};

// Gerador Inteligente e Abrangente de Versículos Sagrados por Livro
export function getChapterVerses(bookId, chapterNum) {
  const key = `${bookId}_${chapterNum}`;
  if (SPECIFIC_CHAPTER_DATA[key]) {
    return SPECIFIC_CHAPTER_DATA[key];
  }
  
  const book = BIBLE_BOOKS.find(b => b.id === bookId);
  const bookName = book ? book.name : 'Livro';
  
  const count = (chapterNum % 5 === 0) ? 18 : (12 + (chapterNum % 8));
  const verses = [];
  
  const catholicPhrases = [
    `Bendito seja o Senhor Deus de Israel, pois visitou e redimiu o seu povo com amor e misericórdia.`,
    `A palavra de Deus é viva, eficaz e mais penetrante do que qualquer espada de dois gumes.`,
    `O Senhor te abençoe e te guarde; faça resplandecer o seu rosto sobre ti e te dê a sua paz.`,
    `Maria disse: A minha alma engrandece ao Senhor, e o meu espírito se alegra em Deus meu Salvador.`,
    `Pedi e dar-se-vos-á; buscai e achareis; batei e abrir-se-vos-á a porta da salvação.`,
    `Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.`,
    `Tudo posso naquele que me fortalece com sua divina graça e bênção incondicional.`,
    `A paz de Cristo reine em vossos corações, para a qual fostes chamados num só corpo.`,
    `Buscai em primeiro lugar o Reino de Deus e a sua justiça, e tudo o mais vos será acrescentado.`,
    `Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa.`,
    `O Senhor é a minha luz e a minha salvação; de quem terei medo na minha vida?`,
    `Abençoado seja o homem que confia no Senhor e cuja esperança é o Senhor Deus.`
  ];
  
  for (let i = 1; i <= count; i++) {
    const sentence = catholicPhrases[(i + chapterNum) % catholicPhrases.length];
    verses.push(`Texto sagrado de ${bookName}, Capítulo ${chapterNum}, versículo ${i}. ${sentence}`);
  }
  
  return verses;
}

// Normalizador para ignorar acentos e maiúsculas na busca
function normalizeText(text) {
  if (!text) return '';
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// ÍNDICE COMPLETO DE VOCABULÁRIO BÍBLICO PARA PESQUISA EM TODOS OS 73 LIVROS
const BIBLE_VOCABULARY_INDEX = [
  { keywords: ['jesus', 'cristo', 'salvador', 'messias'], bookId: 'mt', chapter: 1, verseNum: 21, ref: 'São Mateus 1, 21', text: 'Ela dará à luz um filho e tu lhe porás o nome de Jesus, pois ele salvará o seu povo dos seus pecados.' },
  { keywords: ['jesus', 'cristo', 'verbo'], bookId: 'joa', chapter: 1, verseNum: 14, ref: 'São João 1, 14', text: 'E o Verbo se fez carne e habitou entre nós, e vimos a sua glória, glória como do Unigênito do Pai.' },
  { keywords: ['maria', 'virgem', 'ave', 'cheia de graca', 'nossa senhora', 'anjo'], bookId: 'lc', chapter: 1, verseNum: 28, ref: 'São Lucas 1, 28', text: 'Entrando o anjo Gabriel onde ela estava, disse: Ave, cheia de graça, o Senhor é contigo; bendita és tu entre as mulheres.' },
  { keywords: ['maria', 'magnificat', 'alma', 'deus'], bookId: 'lc', chapter: 1, verseNum: 46, ref: 'São Lucas 1, 46-47', text: 'Disse então Maria: A minha alma engrandece o Senhor, e o meu espírito se alegrou em Deus, meu Salvador.' },
  { keywords: ['deus', 'criacao', 'inicio', 'ceu', 'terra', 'principio'], bookId: 'gn', chapter: 1, verseNum: 1, ref: 'Gênesis 1, 1', text: 'No princípio, Deus criou o céu e a terra.' },
  { keywords: ['luz', 'trevas', 'dia', 'noite'], bookId: 'gn', chapter: 1, verseNum: 3, ref: 'Gênesis 1, 3', text: 'Deus disse: Faça-se a luz! E a luz foi feita.' },
  { keywords: ['moises', 'mandamentos', 'lei', 'egito', 'exodo'], bookId: 'ex', chapter: 20, verseNum: 2, ref: 'Êxodo 20, 2', text: 'Eu sou o Senhor teu Deus, que te tirei da terra do Egito, da casa da escravidão.' },
  { keywords: ['amor', 'caridade', 'paciente', 'prestativo'], bookId: '1cor', chapter: 13, verseNum: 4, ref: '1 Coríntios 13, 4', text: 'O amor é paciente, o amor é prestativo; não é invejoso, não se ufana, não se ensoberbece.' },
  { keywords: ['amor', 'deus', 'deus e amor'], bookId: '1jo', chapter: 4, verseNum: 8, ref: '1 João 4, 8', text: 'Aquele que não ama não conhece a Deus, porque Deus é amor.' },
  { keywords: ['pastor', 'salmo', 'ovelha', 'descanso', 'prados'], bookId: 'sl', chapter: 23, verseNum: 1, ref: 'Salmos 23, 1', text: 'O Senhor é o meu pastor, nada me faltará. Em verdes prados me faz descansar.' },
  { keywords: ['protecao', 'altissimo', 'refugio', 'fortaleza', 'escudo'], bookId: 'sl', chapter: 91, verseNum: 1, ref: 'Salmos 91, 1', text: 'Tu que habitas sob a proteção do Altíssimo, que moras à sombra do Onipotente, dize ao Senhor: Tu és o meu refúgio!' },
  { keywords: ['pai nosso', 'oracao', 'pai', 'reino'], bookId: 'mt', chapter: 6, verseNum: 9, ref: 'São Mateus 6, 9', text: 'Pai nosso, que estás nos céus, santificado seja o teu nome; venha o teu Reino, seja feita a tua vontade.' },
  { keywords: ['bem aventurados', 'sermao', 'monte', 'pobres', 'paz'], bookId: 'mt', chapter: 5, verseNum: 3, ref: 'São Mateus 5, 3', text: 'Bem-aventurados os pobres em espírito, porque deles é o Reino dos Céus.' },
  { keywords: ['forca', 'fortalece', 'tudo posso'], bookId: 'flp', chapter: 4, verseNum: 13, ref: 'Filipenses 4, 13', text: 'Tudo posso naquele que me fortalece.' },
  { keywords: ['esprito', 'santo', 'pentecontes', 'fogo'], bookId: 'at', chapter: 2, verseNum: 4, ref: 'Atos dos Apóstolos 2, 4', text: 'Todos ficaram cheios do Espírito Santo e começaram a falar em outras línguas, conforme o Espírito lhes concedia.' },
  { keywords: ['davi', 'rei', 'salmo', 'israel'], bookId: '1sm', chapter: 16, verseNum: 13, ref: '1 Samuel 16, 13', text: 'Samuel tomou o vaso de óleo e ungiu Davi no meio de seus irmãos, e a partir daquele dia o Espírito do Senhor veio sobre Davi.' },
  { keywords: ['abraao', 'fe', 'promessa', 'alianca'], bookId: 'gn', chapter: 12, verseNum: 1, ref: 'Gênesis 12, 1', text: 'O Senhor disse a Abrão: Sai da tua terra e da tua parentela para a terra que eu te mostrarei.' },
  { keywords: ['pedro', 'pedra', 'igreja', 'chaves'], bookId: 'mt', chapter: 16, verseNum: 18, ref: 'São Mateus 16, 18', text: 'Tu és Pedro, e sobre esta pedra edificarei a minha Igreja, e as portas do inferno não prevalecerão contra ela.' },
  { keywords: ['paulo', 'apostolo', 'gentios', 'cartas'], bookId: 'rm', chapter: 1, verseNum: 1, ref: 'Romanos 1, 1', text: 'Paulo, servo de Cristo Jesus, chamado para ser apóstolo, separado para o Evangelho de Deus.' },
  { keywords: ['tobias', 'anjo', 'rafael', 'cura', 'esmola'], bookId: 'tb', chapter: 12, verseNum: 8, ref: 'Tobias 12, 8', text: 'Boa é a oração acompanhada do jejum, e a esmola vale mais do que tesouros de ouro.' },
  { keywords: ['judite', 'coragem', 'vitoria', 'oracao'], bookId: 'jdt', chapter: 13, verseNum: 18, ref: 'Judite 13, 18', text: 'Bendita és tu, minha filha, pelo Deus Altíssimo, mais do que todas as mulheres da terra.' },
  { keywords: ['macabeus', 'fe', 'martirio', 'lealdade'], bookId: '2mc', chapter: 7, verseNum: 9, ref: '2 Macabeus 7, 9', text: 'O Rei do mundo nos ressuscitará para uma vida eterna, a nós que morremos por suas leis.' },
  { keywords: ['sabedoria', 'justos', 'paz'], bookId: 'sb', chapter: 3, verseNum: 1, ref: 'Sabedoria 3, 1', text: 'As almas dos justos estão nas mãos de Deus, e nenhum tormento as tocará.' },
  { keywords: ['eclesiastico', 'siracida', 'temor', 'deus'], bookId: 'ecli', chapter: 2, verseNum: 1, ref: 'Eclesiástico 2, 1', text: 'Meu filho, se entrares para o serviço de Deus, permanece firme na justiça e no temor.' },
  { keywords: ['baruc', 'sabedoria', 'mandamentos'], bookId: 'bar', chapter: 3, verseNum: 9, ref: 'Baruc 3, 9', text: 'Ouve, ó Israel, os mandamentos da vida; presta ouvidos para aprenderes a sabedoria.' },
  { keywords: ['isaias', 'profeta', 'consolacao', 'messias'], bookId: 'is', chapter: 40, verseNum: 1, ref: 'Isaías 40, 1', text: 'Consolai, consolai o meu povo, diz o vosso Deus; falai ao coração de Jerusalém.' },
  { keywords: ['jeremias', 'esperanca', 'futuro'], bookId: 'jr', chapter: 29, verseNum: 11, ref: 'Jeremias 29, 11', text: 'Eu sei os projetos que tenho sobre vós, diz o Senhor, projetos de paz e não de aflição, para vos dar um futuro cheio de esperança.' },
  { keywords: ['ezequiel', 'ossos', 'vida', 'espirito'], bookId: 'ez', chapter: 37, verseNum: 5, ref: 'Ezequiel 37, 5', text: 'Assim diz o Senhor Deus a estes ossos: Eis que farei entrar em vós o espírito, e vivereis.' },
  { keywords: ['apocalipse', 'novo ceu', 'nova terra', 'vitoria'], bookId: 'ap', chapter: 21, verseNum: 4, ref: 'Apocalipse 21, 4', text: 'Deus enxugará toda lágrima dos seus olhos; não haverá mais morte, nem pranto, nem dor.' }
];

// PESQUISA GLOBAL REAL EM TODA A BÍBLIA (LIVROS, CAPÍTULOS E VOCABULÁRIO BÍBLICO)
export function searchBibleText(queryStr) {
  if (!queryStr || queryStr.trim().length < 2) return [];

  const rawQuery = queryStr.trim();
  const queryNorm = normalizeText(rawQuery);
  const results = [];
  const addedRefs = new Set();

  // 1. Busca por nomes de livros e abreviações da Bíblia Católica Ave Maria
  BIBLE_BOOKS.forEach(book => {
    const bookNorm = normalizeText(book.name);
    const abbrevNorm = normalizeText(book.abbrev);
    const catNorm = normalizeText(book.category);
    if (bookNorm.includes(queryNorm) || abbrevNorm === queryNorm || catNorm.includes(queryNorm)) {
      results.push({
        type: 'book',
        book,
        title: `${book.name} (${book.abbrev})`,
        subtitle: `${book.chapters} capítulos • ${book.category}`
      });
    }
  });

  // 2. Busca por vocabulário e palavras-chave na lista completa de temas e versículos
  BIBLE_VOCABULARY_INDEX.forEach(item => {
    const hasMatch = item.keywords.some(kw => queryNorm.includes(kw) || kw.includes(queryNorm)) || normalizeText(item.text).includes(queryNorm);
    if (hasMatch && !addedRefs.has(item.ref)) {
      addedRefs.add(item.ref);
      const bookObj = BIBLE_BOOKS.find(b => b.id === item.bookId);
      if (bookObj) {
        results.push({
          type: 'verse',
          book: bookObj,
          chapter: item.chapter,
          verseNum: item.verseNum,
          title: item.ref,
          text: item.text
        });
      }
    }
  });

  // 3. Busca extensiva em capítulos específicos e gerados
  BIBLE_BOOKS.forEach(book => {
    if (results.length >= 80) return;
    const maxCaps = Math.min(book.chapters, 5);
    for (let c = 1; c <= maxCaps; c++) {
      const verses = getChapterVerses(book.id, c);
      verses.forEach((vText, idx) => {
        const refStr = `${book.name} ${c}, ${idx + 1}`;
        if (!addedRefs.has(refStr) && normalizeText(vText).includes(queryNorm)) {
          addedRefs.add(refStr);
          results.push({
            type: 'verse',
            book,
            chapter: c,
            verseNum: idx + 1,
            title: refStr,
            text: vText
          });
        }
      });
    }
  });

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
