// ACERVO DE MEDITAÇÃO DA GALERIA ESPIRITUAL - IMAGENS SACRAS E VERSÍCULOS MULTILÍNGUES

export const GALLERY_CATEGORIES = [
  { id: 'all', pt: 'Todas', en: 'All', es: 'Todas', icon: 'fas fa-border-all' },
  { id: 'paz', pt: 'Paz & Conforto', en: 'Peace & Comfort', es: 'Paz & Consuelo', icon: 'fas fa-dove' },
  { id: 'fe', pt: 'Fé & Vitória', en: 'Faith & Victory', es: 'Fe & Victoria', icon: 'fas fa-shield-halved' },
  { id: 'amor', pt: 'Amor & Família', en: 'Love & Family', es: 'Amor & Familia', icon: 'fas fa-heart' },
  { id: 'gratidao', pt: 'Gratidão & Louvor', en: 'Gratitude & Praise', es: 'Gratitud & Alabanza', icon: 'fas fa-sun' },
  { id: 'sabedoria', pt: 'Sabedoria & Esperança', en: 'Wisdom & Hope', es: 'Sabiduría & Esperanza', icon: 'fas fa-compass' },
  { id: 'maria', pt: 'Nossa Senhora', en: 'Our Lady', es: 'Nuestra Señora', icon: 'fas fa-crown' }
];

export const GALLERY_ITEMS = [
  // --- PAZ & CONFORTO ---
  {
    id: 'gal-1',
    category: 'paz',
    bookId: 'sl', chapter: 23, verseNum: 1,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    pt: { reference: "Salmos 23, 1-2", text: "O Senhor é o meu pastor, nada me faltará. Em verdes prados me faz descansar, conduz-me às águas refrescantes." },
    en: { reference: "Psalms 23:1-2", text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures; He leads me beside quiet waters." },
    es: { reference: "Salmos 23, 1-2", text: "El Señor es mi pastor, nada me falta. En verdes prados me hace descansar, junto a aguas de reposo me conduce." }
  },
  {
    id: 'gal-2',
    category: 'paz',
    bookId: 'sl', chapter: 91, verseNum: 1,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)',
    pt: { reference: "Salmos 91, 1-2", text: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu refúgio e a minha fortaleza." },
    en: { reference: "Psalms 91:1-2", text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, He is my refuge and my fortress." },
    es: { reference: "Salmos 91, 1-2", text: "El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo del Señor: Esperanza mía, y castillo mío; mi Dios, en quien confiaré." }
  },
  {
    id: 'gal-3',
    category: 'paz',
    bookId: 'joa', chapter: 14, verseNum: 27,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    pt: { reference: "São João 14, 27", text: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize." },
    en: { reference: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." },
    es: { reference: "San Juan 14, 27", text: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo." }
  },
  {
    id: 'gal-4',
    category: 'paz',
    bookId: 'mt', chapter: 11, verseNum: 28,
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #311b92 0%, #4a148c 100%)',
    pt: { reference: "São Mateus 11, 28", text: "Vinde a mim, todos vós que estais cansados e oprimidos, e eu vos aliviarei. Tomai sobre vós o meu jugo e aprendei de mim, que sou manso e humilde de coração." },
    en: { reference: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart." },
    es: { reference: "San Mateo 11, 28", text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar. Llevad mi yugo sobre vosotros, y aprended de mí, que soy manso y humilde de corazón." }
  },

  // --- FÉ & VITÓRIA ---
  {
    id: 'gal-5',
    category: 'fe',
    bookId: 'flp', chapter: 4, verseNum: 13,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)',
    pt: { reference: "Filipenses 4, 13", text: "Tudo posso naquele que me fortalece." },
    en: { reference: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
    es: { reference: "Filipenses 4, 13", text: "Todo lo puedo en Cristo que me fortalece." }
  },
  {
    id: 'gal-6',
    category: 'fe',
    bookId: 'is', chapter: 40, verseNum: 31,
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
    pt: { reference: "Isaías 40, 31", text: "Aqueles que esperam no Senhor renovam as suas forças; voam alto como águias, correm e não se cansam, caminham e não desfalecem." },
    en: { reference: "Isaiah 40:31", text: "Those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
    es: { reference: "Isaías 40, 31", text: "Los que esperan en el Señor renovarán sus fuerzas; volarán con alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán." }
  },
  {
    id: 'gal-7',
    category: 'fe',
    bookId: 'rm', chapter: 8, verseNum: 31,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)',
    pt: { reference: "Romanos 8, 31", text: "Se Deus é por nós, quem será contra nós? Aquele que nem mesmo a seu próprio Filho poupou, antes o entregou por todos nós, como não nos dará com ele todas as coisas?" },
    en: { reference: "Romans 8:31", text: "What, then, shall we say in response to these things? If God is for us, who can be against us?" },
    es: { reference: "Romanos 8, 31", text: "¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?" }
  },
  {
    id: 'gal-8',
    category: 'fe',
    bookId: 'js', chapter: 1, verseNum: 9,
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    pt: { reference: "Josué 1, 9", text: "Não te mandei eu? Sê forte e corajoso! Não temas, nem te espantes, porque o Senhor teu Deus está contigo por onde quer que andares." },
    en: { reference: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous! Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
    es: { reference: "Josué 1, 9", text: "¿No te he mandado que te esfuerces y seas valiente? No temas ni desmayes, porque el Señor tu Dios estará contigo dondequiera que vayas." }
  },

  // --- AMOR & FAMÍLIA ---
  {
    id: 'gal-9',
    category: 'amor',
    bookId: '1cor', chapter: 13, verseNum: 7,
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)',
    pt: { reference: "1 Coríntios 13, 7-8", text: "O amor tudo desculpa, tudo crê, tudo espera, tudo suporta. O amor jamais acabará." },
    en: { reference: "1 Corinthians 13:7-8", text: "Love always protects, always trusts, always hopes, always perseveres. Love never fails." },
    es: { reference: "1 Corintios 13, 7-8", text: "El amor todo lo sufre, todo lo cree, todo lo espera, todo lo soporta. El amor nunca deja de ser." }
  },
  {
    id: 'gal-10',
    category: 'amor',
    bookId: '1jo', chapter: 4, verseNum: 16,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #701a75 0%, #4a044e 100%)',
    pt: { reference: "1 João 4, 16", text: "Deus é amor: e aquele que permanece no amor permanece em Deus, e Deus nele." },
    en: { reference: "1 John 4:16", text: "God is love. Whoever lives in love lives in God, and God in them." },
    es: { reference: "1 Juan 4, 16", text: "Dios es amor; y el que permanece en amor, permanece en Dios, y Dios en él." }
  },
  {
    id: 'gal-11',
    category: 'amor',
    bookId: 'col', chapter: 3, verseNum: 14,
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #831843 0%, #500724 100%)',
    pt: { reference: "Colossenses 3, 14", text: "E, sobre tudo isto, revesti-vos da caridade, que é o vínculo da perfeição. E a paz de Cristo reine em vossos corações." },
    en: { reference: "Colossians 3:14", text: "And over all these virtues put on love, which binds them all together in perfect unity." },
    es: { reference: "Colosenses 3, 14", text: "Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto." }
  },
  {
    id: 'gal-12',
    category: 'amor',
    bookId: 'sl', chapter: 127, verseNum: 1,
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)',
    pt: { reference: "Salmos 127, 1", text: "Se o Senhor não edificar a casa, em vão trabalham os que a constroem; se o Senhor não guardar a cidade, em vão vigia a sentinela." },
    en: { reference: "Psalms 127:1", text: "Unless the Lord builds the house, the builders labor in vain. Unless the Lord watches over the city, the guards stand watch in vain." },
    es: { reference: "Salmos 127, 1", text: "Si el Señor no edificare la casa, en vano trabajan los que la edifican; si el Señor no guardare la ciudad, en vano vela la guardia." }
  },

  // --- GRATIDÃO & LOUVOR ---
  {
    id: 'gal-13',
    category: 'gratidao',
    bookId: 'sl', chapter: 103, verseNum: 1,
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)',
    pt: { reference: "Salmos 103, 1-2", text: "Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome. Bendize ao Senhor e não te esqueças de nenhum de seus benefícios." },
    en: { reference: "Psalms 103:1-2", text: "Praise the Lord, my soul; all my inmost being, praise his holy name. Praise the Lord, my soul, and forget not all his benefits." },
    es: { reference: "Salmos 103, 1-2", text: "Bendice, alma mía, al Señor, y bendiga todo mi ser su santo nombre. Bendice, alma mía, al Señor, y no olvides ninguno de sus beneficios." }
  },
  {
    id: 'gal-14',
    category: 'gratidao',
    bookId: 'sl', chapter: 150, verseNum: 6,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #4c1d95 0%, #2e1065 100%)',
    pt: { reference: "Salmos 150, 6", text: "Tudo o que tem fôlego louve ao Senhor! Aleluia!" },
    en: { reference: "Psalms 150:6", text: "Let everything that has breath praise the Lord. Praise the Lord." },
    es: { reference: "Salmos 150, 6", text: "Todo lo que respira alabe al Señor. ¡Aleluya!" }
  },
  {
    id: 'gal-15',
    category: 'gratidao',
    bookId: '1ts', chapter: 5, verseNum: 16,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #854d0e 0%, #451a03 100%)',
    pt: { reference: "1 Tessalonicenses 5, 16-18", text: "Regozijai-vos sempre. Orai sem cessar. Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco." },
    en: { reference: "1 Thessalonians 5:16-18", text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus." },
    es: { reference: "1 Tesalonicenses 5, 16-18", text: "Estad siempre gozosos. Orad sin cesar. Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús." }
  },
  {
    id: 'gal-16',
    category: 'gratidao',
    bookId: 'sl', chapter: 118, verseNum: 24,
    imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
    pt: { reference: "Salmos 118, 24", text: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele." },
    en: { reference: "Psalms 118:24", text: "The Lord has done it this very day; let us rejoice today and be glad." },
    es: { reference: "Salmos 118, 24", text: "Este es el día que hizo el Señor; nos gozaremos y alegraremos en él." }
  },

  // --- SABEDORIA & ESPERANÇA ---
  {
    id: 'gal-17',
    category: 'sabedoria',
    bookId: 'jr', chapter: 29, verseNum: 11,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #0c4a6e 100%)',
    pt: { reference: "Jeremias 29, 11", text: "Eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar um futuro e uma esperança." },
    en: { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
    es: { reference: "Jeremías 29, 11", text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice el Señor, pensamientos de paz, y no de mal, para daros el fin que esperáis." }
  },
  {
    id: 'gal-18',
    category: 'sabedoria',
    bookId: 'pv', chapter: 3, verseNum: 5,
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #713f12 0%, #451a03 100%)',
    pt: { reference: "Provérbios 3, 5-6", text: "Confia no Senhor de todo o teu coração e não te apoies na tua própria inteligência. Em todos os teus caminhos, reconhece-o, e ele endireitará as tuas veredas." },
    en: { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    es: { reference: "Proverbios 3, 5-6", text: "Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas." }
  },
  {
    id: 'gal-19',
    category: 'sabedoria',
    bookId: 'tg', chapter: 1, verseNum: 5,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #134e4a 0%, #042f2e 100%)',
    pt: { reference: "Tiago 1, 5", text: "Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá generosamente e sem censura, e ser-lhe-á dada." },
    en: { reference: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you." },
    es: { reference: "Santiago 1, 5", text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada." }
  },
  {
    id: 'gal-20',
    category: 'sabedoria',
    bookId: 'sl', chapter: 119, verseNum: 105,
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
    pt: { reference: "Salmos 119, 105", text: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho." },
    en: { reference: "Psalms 119:105", text: "Your word is a lamp for my feet, a light on my path." },
    es: { reference: "Salmos 119, 105", text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino." }
  },

  // --- NOSSA SENHORA & SANTOS ---
  {
    id: 'gal-21',
    category: 'maria',
    bookId: 'lc', chapter: 1, verseNum: 46,
    imageUrl: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
    pt: { reference: "São Lucas 1, 46-49", text: "A minha alma engrandece ao Senhor, e o meu espírito se alegra em Deus meu Salvador; porque o Todo-Poderoso fez em mim grandes coisas, e santo é o seu nome." },
    en: { reference: "Luke 1:46-49", text: "My soul magnifies the Lord, and my spirit rejoices in God my Savior; for the Mighty One has done great things for me—holy is his name." },
    es: { reference: "San Lucas 1, 46-49", text: "Engrandece mi alma al Señor; y mi espíritu se regocija en Dios mi Salvador. Porque me ha hecho grandes cosas el Poderoso; ¡Santo es su nombre!" }
  },
  {
    id: 'gal-22',
    category: 'maria',
    bookId: 'lc', chapter: 1, verseNum: 38,
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #0369a1 0%, #075985 100%)',
    pt: { reference: "São Lucas 1, 38", text: "Disse então Maria: Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra." },
    en: { reference: "Luke 1:38", text: "I am the Lord’s servant, Mary answered. May your word to me be fulfilled." },
    es: { reference: "San Lucas 1, 38", text: "Entonces María dijo: He aquí la sierva del Señor; hágase conmigo conforme a tu palabra." }
  },
  {
    id: 'gal-23',
    category: 'maria',
    bookId: 'ap', chapter: 12, verseNum: 1,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #4c1d95 0%, #581c87 100%)',
    pt: { reference: "Apocalipse 12, 1", text: "Apareceu no céu um grande sinal: uma mulher vestida de sol, com a lua debaixo dos seus pés e uma coroa de doze estrelas sobre a cabeça." },
    en: { reference: "Revelation 12:1", text: "A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet and a crown of twelve stars on her head." },
    es: { reference: "Apocalipsis 12, 1", text: "Apareció en el cielo una gran señal: una mujer vestida del sol, con la luna debajo de sus pies, y sobre su cabeza una corona de doce estrellas." }
  },
  {
    id: 'gal-24',
    category: 'maria',
    bookId: 'tb', chapter: 12, verseNum: 15,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    bg: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
    pt: { reference: "Tobias 12, 15", text: "Eu sou Rafael, um dos sete santos anjos que assistem e têm entrada diante da majestade do Senhor." },
    en: { reference: "Tobit 12:15", text: "I am Raphael, one of the seven holy angels who present the prayers of the saints and enter into the presence of the glory of the Holy One." },
    es: { reference: "Tobías 12, 15", text: "Yo soy Rafael, uno de los siete santos ángeles que presentamos las oraciones de los santos y tenemos entrada ante la majestad del Santo." }
  }
];

export function getGalleryCategories() {
  return GALLERY_CATEGORIES;
}

export function getGalleryItems(category = 'all') {
  if (!category || category === 'all') return GALLERY_ITEMS;
  return GALLERY_ITEMS.filter(item => item.category === category);
}
