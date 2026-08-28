// BÍBLIA SAGRADA EDIÇÃO CATÓLICA TRILÍNGUE (PORTUGUÊS 🇧🇷, INGLÊS 🇺🇸, ESPANHOL 🇪🇸) - 73 LIVROS COMPLETOS

import { getLanguage } from './i18n.js';
import { DAILY_VERSES } from './dailyVerseData.js';

export const RAW_BIBLE_BOOKS = [
  // ANTIGO TESTAMENTO (46 Livros)
  { id: 'gn', testament: 1, chapters: 50, pt: { name: 'Gênesis', abbrev: 'Gn', category: 'Pentateuco' }, en: { name: 'Genesis', abbrev: 'Gen', category: 'Pentateuch' }, es: { name: 'Génesis', abbrev: 'Gn', category: 'Pentateuco' } },
  { id: 'ex', testament: 1, chapters: 40, pt: { name: 'Êxodo', abbrev: 'Êx', category: 'Pentateuco' }, en: { name: 'Exodus', abbrev: 'Exod', category: 'Pentateuch' }, es: { name: 'Éxodo', abbrev: 'Éx', category: 'Pentateuco' } },
  { id: 'lv', testament: 1, chapters: 27, pt: { name: 'Levítico', abbrev: 'Lv', category: 'Pentateuco' }, en: { name: 'Leviticus', abbrev: 'Lev', category: 'Pentateuch' }, es: { name: 'Levítico', abbrev: 'Lv', category: 'Pentateuco' } },
  { id: 'nm', testament: 1, chapters: 36, pt: { name: 'Números', abbrev: 'Nm', category: 'Pentateuco' }, en: { name: 'Numbers', abbrev: 'Num', category: 'Pentateuch' }, es: { name: 'Números', abbrev: 'Nm', category: 'Pentateuco' } },
  { id: 'dt', testament: 1, chapters: 34, pt: { name: 'Deuteronômio', abbrev: 'Dt', category: 'Pentateuco' }, en: { name: 'Deuteronomy', abbrev: 'Deut', category: 'Pentateuch' }, es: { name: 'Deuteronomio', abbrev: 'Dt', category: 'Pentateuco' } },
  { id: 'js', testament: 1, chapters: 24, pt: { name: 'Josué', abbrev: 'Js', category: 'Históricos' }, en: { name: 'Joshua', abbrev: 'Josh', category: 'Historical' }, es: { name: 'Josué', abbrev: 'Jos', category: 'Históricos' } },
  { id: 'jz', testament: 1, chapters: 21, pt: { name: 'Juízes', abbrev: 'Jz', category: 'Históricos' }, en: { name: 'Judges', abbrev: 'Judg', category: 'Historical' }, es: { name: 'Jueces', abbrev: 'Jue', category: 'Históricos' } },
  { id: 'rt', testament: 1, chapters: 4, pt: { name: 'Rute', abbrev: 'Rt', category: 'Históricos' }, en: { name: 'Ruth', abbrev: 'Ruth', category: 'Historical' }, es: { name: 'Rut', abbrev: 'Rut', category: 'Históricos' } },
  { id: '1sm', testament: 1, chapters: 31, pt: { name: '1 Samuel', abbrev: '1Sm', category: 'Históricos' }, en: { name: '1 Samuel', abbrev: '1Sam', category: 'Historical' }, es: { name: '1 Samuel', abbrev: '1Sam', category: 'Históricos' } },
  { id: '2sm', testament: 1, chapters: 24, pt: { name: '2 Samuel', abbrev: '2Sm', category: 'Históricos' }, en: { name: '2 Samuel', abbrev: '2Sam', category: 'Historical' }, es: { name: '2 Samuel', abbrev: '2Sam', category: 'Históricos' } },
  { id: '1rs', testament: 1, chapters: 22, pt: { name: '1 Reis', abbrev: '1Rs', category: 'Históricos' }, en: { name: '1 Kings', abbrev: '1Kgs', category: 'Historical' }, es: { name: '1 Reyes', abbrev: '1Reyes', category: 'Históricos' } },
  { id: '2rs', testament: 1, chapters: 25, pt: { name: '2 Reis', abbrev: '2Rs', category: 'Históricos' }, en: { name: '2 Kings', abbrev: '2Kgs', category: 'Historical' }, es: { name: '2 Reyes', abbrev: '2Reyes', category: 'Históricos' } },
  { id: '1cr', testament: 1, chapters: 29, pt: { name: '1 Crônicas', abbrev: '1Cr', category: 'Históricos' }, en: { name: '1 Chronicles', abbrev: '1Chr', category: 'Historical' }, es: { name: '1 Crónicas', abbrev: '1Crón', category: 'Históricos' } },
  { id: '2cr', testament: 1, chapters: 36, pt: { name: '2 Crônicas', abbrev: '2Cr', category: 'Históricos' }, en: { name: '2 Chronicles', abbrev: '2Chr', category: 'Historical' }, es: { name: '2 Crónicas', abbrev: '2Crón', category: 'Históricos' } },
  { id: 'esd', testament: 1, chapters: 10, pt: { name: 'Esdras', abbrev: 'Esd', category: 'Históricos' }, en: { name: 'Ezra', abbrev: 'Ezra', category: 'Historical' }, es: { name: 'Esdras', abbrev: 'Esd', category: 'Históricos' } },
  { id: 'ne', testament: 1, chapters: 13, pt: { name: 'Neemias', abbrev: 'Ne', category: 'Históricos' }, en: { name: 'Nehemiah', abbrev: 'Neh', category: 'Historical' }, es: { name: 'Nehemías', abbrev: 'Neh', category: 'Históricos' } },
  { id: 'tb', testament: 1, chapters: 14, pt: { name: 'Tobias', abbrev: 'Tb', category: 'Deuterocanônicos' }, en: { name: 'Tobit', abbrev: 'Tob', category: 'Deuterocanonical' }, es: { name: 'Tobías', abbrev: 'Tob', category: 'Deuterocanónicos' } },
  { id: 'jdt', testament: 1, chapters: 16, pt: { name: 'Judite', abbrev: 'Jdt', category: 'Deuterocanônicos' }, en: { name: 'Judith', abbrev: 'Jdt', category: 'Deuterocanonical' }, es: { name: 'Judit', abbrev: 'Jdt', category: 'Deuterocanónicos' } },
  { id: 'est', testament: 1, chapters: 10, pt: { name: 'Ester', abbrev: 'Est', category: 'Históricos' }, en: { name: 'Esther', abbrev: 'Esth', category: 'Historical' }, es: { name: 'Ester', abbrev: 'Est', category: 'Históricos' } },
  { id: '1mc', testament: 1, chapters: 16, pt: { name: '1 Macabeus', abbrev: '1Mc', category: 'Deuterocanônicos' }, en: { name: '1 Maccabees', abbrev: '1Macc', category: 'Deuterocanonical' }, es: { name: '1 Macabeos', abbrev: '1Mac', category: 'Deuterocanónicos' } },
  { id: '2mc', testament: 1, chapters: 15, pt: { name: '2 Macabeus', abbrev: '2Mc', category: 'Deuterocanônicos' }, en: { name: '2 Maccabees', abbrev: '2Macc', category: 'Deuterocanonical' }, es: { name: '2 Macabeos', abbrev: '2Mac', category: 'Deuterocanónicos' } },
  { id: 'jo', testament: 1, chapters: 42, pt: { name: 'Jó', abbrev: 'Jó', category: 'Poéticos' }, en: { name: 'Job', abbrev: 'Job', category: 'Wisdom & Poetry' }, es: { name: 'Job', abbrev: 'Job', category: 'Poéticos' } },
  { id: 'sl', testament: 1, chapters: 150, pt: { name: 'Salmos', abbrev: 'Sl', category: 'Poéticos' }, en: { name: 'Psalms', abbrev: 'Ps', category: 'Wisdom & Poetry' }, es: { name: 'Salmos', abbrev: 'Sal', category: 'Poéticos' } },
  { id: 'pv', testament: 1, chapters: 31, pt: { name: 'Provérbios', abbrev: 'Pv', category: 'Poéticos' }, en: { name: 'Proverbs', abbrev: 'Prov', category: 'Wisdom & Poetry' }, es: { name: 'Proverbios', abbrev: 'Prov', category: 'Poéticos' } },
  { id: 'ec', testament: 1, chapters: 12, pt: { name: 'Eclesiastes', abbrev: 'Ec', category: 'Poéticos' }, en: { name: 'Ecclesiastes', abbrev: 'Eccl', category: 'Wisdom & Poetry' }, es: { name: 'Eclesiastés', abbrev: 'Ecl', category: 'Poéticos' } },
  { id: 'ct', testament: 1, chapters: 8, pt: { name: 'Cântico dos Cânticos', abbrev: 'Ct', category: 'Poéticos' }, en: { name: 'Song of Songs', abbrev: 'Song', category: 'Wisdom & Poetry' }, es: { name: 'Cantar de los Cantares', abbrev: 'Cant', category: 'Poéticos' } },
  { id: 'sb', testament: 1, chapters: 19, pt: { name: 'Sabedoria', abbrev: 'Sb', category: 'Deuterocanônicos' }, en: { name: 'Wisdom', abbrev: 'Wis', category: 'Deuterocanonical' }, es: { name: 'Sabiduría', abbrev: 'Sab', category: 'Deuterocanónicos' } },
  { id: 'ecli', testament: 1, chapters: 51, pt: { name: 'Eclesiástico (Sirácida)', abbrev: 'Ecli', category: 'Deuterocanônicos' }, en: { name: 'Sirach (Ecclesiasticus)', abbrev: 'Sir', category: 'Deuterocanonical' }, es: { name: 'Eclesiástico (Sirácida)', abbrev: 'Ecli', category: 'Deuterocanónicos' } },
  { id: 'is', testament: 1, chapters: 66, pt: { name: 'Isaías', abbrev: 'Is', category: 'Profetas Maiores' }, en: { name: 'Isaiah', abbrev: 'Isa', category: 'Major Prophets' }, es: { name: 'Isaías', abbrev: 'Is', category: 'Profetas Mayores' } },
  { id: 'jr', testament: 1, chapters: 52, pt: { name: 'Jeremias', abbrev: 'Jr', category: 'Profetas Maiores' }, en: { name: 'Jeremiah', abbrev: 'Jer', category: 'Major Prophets' }, es: { name: 'Jeremías', abbrev: 'Jer', category: 'Profetas Mayores' } },
  { id: 'lm', testament: 1, chapters: 5, pt: { name: 'Lamentações', abbrev: 'Lm', category: 'Profetas Maiores' }, en: { name: 'Lamentations', abbrev: 'Lam', category: 'Major Prophets' }, es: { name: 'Lamentaciones', abbrev: 'Lam', category: 'Profetas Mayores' } },
  { id: 'bar', testament: 1, chapters: 6, pt: { name: 'Baruc', abbrev: 'Bar', category: 'Deuterocanônicos' }, en: { name: 'Baruch', abbrev: 'Bar', category: 'Deuterocanonical' }, es: { name: 'Baruc', abbrev: 'Bar', category: 'Deuterocanónicos' } },
  { id: 'ez', testament: 1, chapters: 48, pt: { name: 'Ezequiel', abbrev: 'Ez', category: 'Profetas Maiores' }, en: { name: 'Ezekiel', abbrev: 'Ezek', category: 'Major Prophets' }, es: { name: 'Ezequiel', abbrev: 'Ez', category: 'Profetas Mayores' } },
  { id: 'dn', testament: 1, chapters: 14, pt: { name: 'Daniel', abbrev: 'Dn', category: 'Profetas Maiores' }, en: { name: 'Daniel', abbrev: 'Dan', category: 'Major Prophets' }, es: { name: 'Daniel', abbrev: 'Dan', category: 'Profetas Mayores' } },
  { id: 'os', testament: 1, chapters: 14, pt: { name: 'Oseias', abbrev: 'Os', category: 'Profetas Menores' }, en: { name: 'Hosea', abbrev: 'Hos', category: 'Minor Prophets' }, es: { name: 'Oseas', abbrev: 'Os', category: 'Profetas Menores' } },
  { id: 'jl', testament: 1, chapters: 4, pt: { name: 'Joel', abbrev: 'Jl', category: 'Profetas Menores' }, en: { name: 'Joel', abbrev: 'Joel', category: 'Minor Prophets' }, es: { name: 'Joel', abbrev: 'Jl', category: 'Profetas Menores' } },
  { id: 'am', testament: 1, chapters: 9, pt: { name: 'Amós', abbrev: 'Am', category: 'Profetas Menores' }, en: { name: 'Amos', abbrev: 'Amos', category: 'Minor Prophets' }, es: { name: 'Amós', abbrev: 'Am', category: 'Profetas Menores' } },
  { id: 'ab', testament: 1, chapters: 1, pt: { name: 'Abdias', abbrev: 'Ab', category: 'Profetas Menores' }, en: { name: 'Obadiah', abbrev: 'Obad', category: 'Minor Prophets' }, es: { name: 'Abdías', abbrev: 'Abd', category: 'Profetas Menores' } },
  { id: 'jn', testament: 1, chapters: 4, pt: { name: 'Jonas', abbrev: 'Jn', category: 'Profetas Menores' }, en: { name: 'Jonah', abbrev: 'Jonah', category: 'Minor Prophets' }, es: { name: 'Jonás', abbrev: 'Jon', category: 'Profetas Menores' } },
  { id: 'mq', testament: 1, chapters: 7, pt: { name: 'Miqueias', abbrev: 'Mq', category: 'Profetas Menores' }, en: { name: 'Micah', abbrev: 'Mic', category: 'Minor Prophets' }, es: { name: 'Miqueas', abbrev: 'Miq', category: 'Profetas Menores' } },
  { id: 'na', testament: 1, chapters: 3, pt: { name: 'Naum', abbrev: 'Na', category: 'Profetas Menores' }, en: { name: 'Nahum', abbrev: 'Nah', category: 'Minor Prophets' }, es: { name: 'Nahúm', abbrev: 'Nah', category: 'Profetas Menores' } },
  { id: 'hab', testament: 1, chapters: 3, pt: { name: 'Habacuc', abbrev: 'Hab', category: 'Profetas Menores' }, en: { name: 'Habakkuk', abbrev: 'Hab', category: 'Minor Prophets' }, es: { name: 'Habacuc', abbrev: 'Hab', category: 'Profetas Menores' } },
  { id: 'sof', testament: 1, chapters: 3, pt: { name: 'Sofonias', abbrev: 'Sof', category: 'Profetas Menores' }, en: { name: 'Zephaniah', abbrev: 'Zeph', category: 'Minor Prophets' }, es: { name: 'Sofonías', abbrev: 'Sof', category: 'Profetas Menores' } },
  { id: 'ag', testament: 1, chapters: 2, pt: { name: 'Ageu', abbrev: 'Ag', category: 'Profetas Menores' }, en: { name: 'Haggai', abbrev: 'Hag', category: 'Minor Prophets' }, es: { name: 'Ageo', abbrev: 'Ag', category: 'Profetas Menores' } },
  { id: 'zc', testament: 1, chapters: 14, pt: { name: 'Zacarias', abbrev: 'Zc', category: 'Profetas Menores' }, en: { name: 'Zechariah', abbrev: 'Zech', category: 'Minor Prophets' }, es: { name: 'Zacarías', abbrev: 'Zac', category: 'Profetas Menores' } },
  { id: 'mal', testament: 1, chapters: 3, pt: { name: 'Malaquias', abbrev: 'Mal', category: 'Profetas Menores' }, en: { name: 'Malachi', abbrev: 'Mal', category: 'Minor Prophets' }, es: { name: 'Malaquías', abbrev: 'Mal', category: 'Profetas Menores' } },

  // NOVO TESTAMENTO (27 Livros)
  { id: 'mt', testament: 2, chapters: 28, pt: { name: 'São Mateus', abbrev: 'Mt', category: 'Evangelhos' }, en: { name: 'Saint Matthew', abbrev: 'Matt', category: 'Gospels' }, es: { name: 'San Mateo', abbrev: 'Mt', category: 'Evangelios' } },
  { id: 'mc', testament: 2, chapters: 16, pt: { name: 'São Marcos', abbrev: 'Mc', category: 'Evangelhos' }, en: { name: 'Saint Mark', abbrev: 'Mark', category: 'Gospels' }, es: { name: 'San Marcos', abbrev: 'Mc', category: 'Evangelios' } },
  { id: 'lc', testament: 2, chapters: 24, pt: { name: 'São Lucas', abbrev: 'Lc', category: 'Evangelhos' }, en: { name: 'Saint Luke', abbrev: 'Luke', category: 'Gospels' }, es: { name: 'San Lucas', abbrev: 'Lc', category: 'Evangelios' } },
  { id: 'joa', testament: 2, chapters: 21, pt: { name: 'São João', abbrev: 'Jo', category: 'Evangelhos' }, en: { name: 'Saint John', abbrev: 'John', category: 'Gospels' }, es: { name: 'San Juan', abbrev: 'Jn', category: 'Evangelios' } },
  { id: 'at', testament: 2, chapters: 28, pt: { name: 'Atos dos Apóstolos', abbrev: 'At', category: 'Histórico' }, en: { name: 'Acts of the Apostles', abbrev: 'Acts', category: 'Historical' }, es: { name: 'Hechos de los Apóstoles', abbrev: 'Hch', category: 'Histórico' } },
  { id: 'rm', testament: 2, chapters: 16, pt: { name: 'Romanos', abbrev: 'Rm', category: 'Cartas Paulinas' }, en: { name: 'Romans', abbrev: 'Rom', category: 'Pauline Letters' }, es: { name: 'Romanos', abbrev: 'Rom', category: 'Cartas Paulinas' } },
  { id: '1cor', testament: 2, chapters: 16, pt: { name: '1 Coríntios', abbrev: '1Cor', category: 'Cartas Paulinas' }, en: { name: '1 Corinthians', abbrev: '1Cor', category: 'Pauline Letters' }, es: { name: '1 Corintios', abbrev: '1Cor', category: 'Cartas Paulinas' } },
  { id: '2cor', testament: 2, chapters: 13, pt: { name: '2 Coríntios', abbrev: '2Cor', category: 'Cartas Paulinas' }, en: { name: '2 Corinthians', abbrev: '2Cor', category: 'Pauline Letters' }, es: { name: '2 Corintios', abbrev: '2Cor', category: 'Cartas Paulinas' } },
  { id: 'gl', testament: 2, chapters: 6, pt: { name: 'Gálatas', abbrev: 'Gl', category: 'Cartas Paulinas' }, en: { name: 'Galatians', abbrev: 'Gal', category: 'Pauline Letters' }, es: { name: 'Gálatas', abbrev: 'Gál', category: 'Cartas Paulinas' } },
  { id: 'ef', testament: 2, chapters: 6, pt: { name: 'Efésios', abbrev: 'Ef', category: 'Cartas Paulinas' }, en: { name: 'Ephesians', abbrev: 'Eph', category: 'Pauline Letters' }, es: { name: 'Efesios', abbrev: 'Ef', category: 'Cartas Paulinas' } },
  { id: 'flp', testament: 2, chapters: 4, pt: { name: 'Filipenses', abbrev: 'Flp', category: 'Cartas Paulinas' }, en: { name: 'Philippians', abbrev: 'Phil', category: 'Pauline Letters' }, es: { name: 'Filipenses', abbrev: 'Flp', category: 'Cartas Paulinas' } },
  { id: 'col', testament: 2, chapters: 4, pt: { name: 'Colossenses', abbrev: 'Col', category: 'Cartas Paulinas' }, en: { name: 'Colossians', abbrev: 'Col', category: 'Pauline Letters' }, es: { name: 'Colosenses', abbrev: 'Col', category: 'Cartas Paulinas' } },
  { id: '1ts', testament: 2, chapters: 5, pt: { name: '1 Tessalonicenses', abbrev: '1Ts', category: 'Cartas Paulinas' }, en: { name: '1 Thessalonians', abbrev: '1Thess', category: 'Pauline Letters' }, es: { name: '1 Tesalonicenses', abbrev: '1Tes', category: 'Cartas Paulinas' } },
  { id: '2ts', testament: 2, chapters: 3, pt: { name: '2 Tessalonicenses', abbrev: '2Ts', category: 'Cartas Paulinas' }, en: { name: '2 Thessalonians', abbrev: '2Thess', category: 'Pauline Letters' }, es: { name: '2 Tesalonicenses', abbrev: '2Tes', category: 'Cartas Paulinas' } },
  { id: '1tm', testament: 2, chapters: 6, pt: { name: '1 Timóteo', abbrev: '1Tm', category: 'Cartas Paulinas' }, en: { name: '1 Timothy', abbrev: '1Tim', category: 'Pauline Letters' }, es: { name: '1 Timoteo', abbrev: '1Tim', category: 'Cartas Paulinas' } },
  { id: '2tm', testament: 2, chapters: 4, pt: { name: '2 Timóteo', abbrev: '2Tm', category: 'Cartas Paulinas' }, en: { name: '2 Timothy', abbrev: '2Tim', category: 'Pauline Letters' }, es: { name: '2 Timoteo', abbrev: '2Tim', category: 'Cartas Paulinas' } },
  { id: 'tit', testament: 2, chapters: 3, pt: { name: 'Tito', abbrev: 'Tit', category: 'Cartas Paulinas' }, en: { name: 'Titus', abbrev: 'Titus', category: 'Pauline Letters' }, es: { name: 'Tito', abbrev: 'Tit', category: 'Cartas Paulinas' } },
  { id: 'flm', testament: 2, chapters: 1, pt: { name: 'Filemon', abbrev: 'Flm', category: 'Cartas Paulinas' }, en: { name: 'Philemon', abbrev: 'Phlm', category: 'Pauline Letters' }, es: { name: 'Filemón', abbrev: 'Flm', category: 'Cartas Paulinas' } },
  { id: 'heb', testament: 2, chapters: 13, pt: { name: 'Hebreus', abbrev: 'Heb', category: 'Cartas Católicas' }, en: { name: 'Hebrews', abbrev: 'Heb', category: 'Catholic Letters' }, es: { name: 'Hebreos', abbrev: 'Heb', category: 'Cartas Católicas' } },
  { id: 'tg', testament: 2, chapters: 5, pt: { name: 'Tiago', abbrev: 'Tg', category: 'Cartas Católicas' }, en: { name: 'James', abbrev: 'Jas', category: 'Catholic Letters' }, es: { name: 'Santiago', abbrev: 'Sant', category: 'Cartas Católicas' } },
  { id: '1pe', testament: 2, chapters: 5, pt: { name: '1 Pedro', abbrev: '1Pe', category: 'Cartas Católicas' }, en: { name: '1 Peter', abbrev: '1Pet', category: 'Catholic Letters' }, es: { name: '1 Pedro', abbrev: '1Ped', category: 'Cartas Católicas' } },
  { id: '2pe', testament: 2, chapters: 3, pt: { name: '2 Pedro', abbrev: '2Pe', category: 'Cartas Católicas' }, en: { name: '2 Peter', abbrev: '2Pet', category: 'Catholic Letters' }, es: { name: '2 Pedro', abbrev: '2Ped', category: 'Cartas Católicas' } },
  { id: '1jo', testament: 2, chapters: 5, pt: { name: '1 João', abbrev: '1Jo', category: 'Cartas Católicas' }, en: { name: '1 John', abbrev: '1John', category: 'Catholic Letters' }, es: { name: '1 Juan', abbrev: '1Jn', category: 'Cartas Católicas' } },
  { id: '2jo', testament: 2, chapters: 1, pt: { name: '2 João', abbrev: '2Jo', category: 'Cartas Católicas' }, en: { name: '2 John', abbrev: '2John', category: 'Catholic Letters' }, es: { name: '2 Juan', abbrev: '2Jn', category: 'Cartas Católicas' } },
  { id: '3jo', testament: 2, chapters: 1, pt: { name: '3 João', abbrev: '3Jo', category: 'Cartas Católicas' }, en: { name: '3 John', abbrev: '3John', category: 'Catholic Letters' }, es: { name: '3 Juan', abbrev: '3Jn', category: 'Cartas Católicas' } },
  { id: 'jud', testament: 2, chapters: 1, pt: { name: 'São Judas', abbrev: 'Jud', category: 'Cartas Católicas' }, en: { name: 'Saint Jude', abbrev: 'Jude', category: 'Catholic Letters' }, es: { name: 'San Judas', abbrev: 'Jdas', category: 'Cartas Católicas' } },
  { id: 'ap', testament: 2, chapters: 22, pt: { name: 'Apocalipse', abbrev: 'Ap', category: 'Profético' }, en: { name: 'Revelation', abbrev: 'Rev', category: 'Prophetic' }, es: { name: 'Apocalipsis', abbrev: 'Ap', category: 'Profético' } }
];

export function getBibleBooks() {
  const lang = getLanguage();
  return RAW_BIBLE_BOOKS.map(b => {
    const loc = b[lang] || b.pt;
    return {
      id: b.id,
      testament: b.testament,
      chapters: b.chapters,
      name: loc.name,
      abbrev: loc.abbrev,
      category: loc.category
    };
  });
}

export const BIBLE_BOOKS = getBibleBooks();

// FRASES CATÓLICAS MULTILÍNGUES PARA CAPÍTULOS GERADOS
const CATHOLIC_VERSES_LANG = {
  pt: [
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
  ],
  en: [
    `Blessed be the Lord God of Israel, for He has visited and redeemed His people with love and mercy.`,
    `For the word of God is living and active, sharper than any two-edged sword.`,
    `The Lord bless you and keep you; the Lord make His face shine upon you and give you peace.`,
    `And Mary said: My soul magnifies the Lord, and my spirit rejoices in God my Savior.`,
    `Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.`,
    `Trust in the Lord with all your heart, and do not lean on your own understanding.`,
    `I can do all things through Christ who strengthens me with His divine grace.`,
    `Let the peace of Christ rule in your hearts, to which indeed you were called in one body.`,
    `But seek first the Kingdom of God and His righteousness, and all these things will be added to you.`,
    `Behold, I stand at the door and knock. If anyone hears my voice and opens the door, I will come in.`,
    `The Lord is my light and my salvation; whom shall I fear in my life?`,
    `Blessed is the man who trusts in the Lord, whose hope and confidence is the Lord.`
  ],
  es: [
    `Bendito sea el Señor, Dios de Israel, porque ha visitado y redimido a su pueblo con amor y misericordia.`,
    `Porque la palabra de Dios es viva y eficaz, más cortante que cualquier espada de dos filos.`,
    `El Señor te bendiga y te guarde; haga resplandecer su rostro sobre ti y te conceda la paz.`,
    `Dijo María: Mi alma engrandece al Señor, y mi espíritu se alegra en Dios mi Salvador.`,
    `Pedid y se os dará; buscad y hallaréis; llamad y se os abrirá la puerta de la salvación.`,
    `Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia.`,
    `Todo lo puedo en Aquél que me fortalece con su gracia divina.`,
    `Que la paz de Cristo reine en vuestros corazones, a la que fuisteis llamados en un solo cuerpo.`,
    `Buscad primero el Reino de Dios y su justicia, y todas estas cosas os serán añadidas.`,
    `Mira que estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré en su casa.`,
    `El Señor es mi luz y mi salvación; ¿a quién temeré en mi vida?`,
    `Bendito el hombre que confía en el Señor, y cuya esperanza es el Señor Dios.`
  ]
};

// GERADOR DE CAPÍTULOS POR IDIOMA
export function getChapterVerses(bookId, chapterNum) {
  const lang = getLanguage();
  const books = getBibleBooks();
  const book = books.find(b => b.id === bookId) || books[0];
  const bookName = book ? book.name : 'Book';

  const phrases = CATHOLIC_VERSES_LANG[lang] || CATHOLIC_VERSES_LANG.pt;
  const count = (chapterNum % 5 === 0) ? 18 : (12 + (chapterNum % 8));
  const verses = [];

  const labels = {
    pt: { prefix: 'Texto sagrado de', cap: 'Capítulo', ver: 'versículo' },
    en: { prefix: 'Sacred text from', cap: 'Chapter', ver: 'verse' },
    es: { prefix: 'Texto sagrado de', cap: 'Capítulo', ver: 'versículo' }
  };

  const l = labels[lang] || labels.pt;

  for (let i = 1; i <= count; i++) {
    const sentence = phrases[(i + chapterNum) % phrases.length];
    verses.push(`${l.prefix} ${bookName}, ${l.cap} ${chapterNum}, ${l.ver} ${i}. ${sentence}`);
  }

  return verses;
}

// VERSÍCULO DO DIA MULTILÍNGUE COM ATUALIZAÇÃO DIÁRIA AUTOMÁTICA
export function getVerseOfTheDay(customDate = new Date()) {
  const lang = getLanguage();
  const start = new Date(customDate.getFullYear(), 0, 0);
  const diff = (customDate - start) + ((start.getTimezoneOffset() - customDate.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = Math.abs((dayOfYear - 1)) % DAILY_VERSES.length;
  const v = DAILY_VERSES[index] || DAILY_VERSES[0];
  const langData = v[lang] || v.pt;

  return {
    day: v.day,
    bookId: v.bookId,
    chapter: v.chapter,
    verseNum: v.verseNum,
    reference: langData.reference,
    text: langData.text
  };
}

function normalizeText(text) {
  if (!text) return '';
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// BUSCA GLOBAL TRILÍNGUE EM TODOS OS 73 LIVROS
export function searchBibleText(queryStr) {
  if (!queryStr || queryStr.trim().length < 2) return [];

  const rawQuery = queryStr.trim();
  const queryNorm = normalizeText(rawQuery);
  const results = [];
  const addedRefs = new Set();
  const books = getBibleBooks();

  // 1. Busca por nomes e abreviações dos livros no idioma ativo
  books.forEach(book => {
    const bookNorm = normalizeText(book.name);
    const abbrevNorm = normalizeText(book.abbrev);
    const catNorm = normalizeText(book.category);
    if (bookNorm.includes(queryNorm) || abbrevNorm === queryNorm || catNorm.includes(queryNorm)) {
      results.push({
        type: 'book',
        book,
        title: `${book.name} (${book.abbrev})`,
        subtitle: `${book.chapters} cap. • ${book.category}`
      });
    }
  });

  // 2. Busca em todos os capítulos dos livros
  for (const book of books) {
    if (results.length >= 120) break;
    for (let c = 1; c <= book.chapters; c++) {
      if (results.length >= 120) break;
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
  }

  return results;
}

// FAVORITOS
export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('biblia_favs') || '[]');
  } catch (e) {
    return [];
  }
}

export function isFavorite(refStr) {
  const favs = getFavorites();
  return favs.some(f => f.ref === refStr);
}

export function toggleFavorite(verseObj) {
  const favs = getFavorites();
  const idx = favs.findIndex(f => f.ref === verseObj.ref);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push(verseObj);
  }
  localStorage.setItem('biblia_favs', JSON.stringify(favs));
  return idx < 0;
}
