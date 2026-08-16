// PLANO DE LEITURA DA BÍBLIA EM 365 DIAS

const PLAN_STORAGE_KEY = 'avemaria_reading_plan_progress';

export function getReadingPlan() {
  const days = [];
  const planSchedule = [
    { day: 1, title: 'Dia 1: A Criação e o Início da Fé', read: 'Gênesis 1-3 • São Mateus 1' },
    { day: 2, title: 'Dia 2: A Queda e as Primeiras Gerações', read: 'Gênesis 4-6 • São Mateus 2' },
    { day: 3, title: 'Dia 3: O Dilúvio e a Aliança com Noé', read: 'Gênesis 7-9 • São Mateus 3' },
    { day: 4, title: 'Dia 4: A Torre de Babel e o Chamado de Abrão', read: 'Gênesis 10-12 • São Mateus 4' },
    { day: 5, title: 'Dia 5: Abrão e Ló, a Promessa de Deus', read: 'Gênesis 13-15 • São Mateus 5, 1-26' },
    { day: 6, title: 'Dia 6: O Sermão da Montanha e as Alianças', read: 'Gênesis 16-18 • São Mateus 5, 27-48' },
    { day: 7, title: 'Dia 7: Sodoma, Gomorra e a Prova de Abraão', read: 'Gênesis 19-21 • São Mateus 6' },
    { day: 8, title: 'Dia 8: O Sacrifício de Isaac e Rebeca', read: 'Gênesis 22-24 • São Mateus 7' },
    { day: 9, title: 'Dia 9: Jacó, Esaú e a Benção da Primogenitura', read: 'Gênesis 25-27 • São Mateus 8' },
    { day: 10, title: 'Dia 10: A Escada de Jacó e Raquel', read: 'Gênesis 28-30 • São Mateus 9' }
  ];

  // Gera a lista até o dia 365
  const extraBooks = ['Êxodo', 'Levítico', 'Salmos', 'Provérbios', 'Isaías', 'São Lucas', 'São João', 'Atos'];
  for (let i = 11; i <= 365; i++) {
    const b = extraBooks[i % extraBooks.length];
    planSchedule.push({
      day: i,
      title: `Dia ${i}: Meditação Diária em ${b}`,
      read: `${b} ${Math.floor(i / 10) + 1} • Salmos ${(i % 150) + 1}`
    });
  }

  const completedSet = getCompletedDays();

  return planSchedule.map(item => ({
    ...item,
    completed: completedSet.includes(item.day)
  }));
}

export function getCompletedDays() {
  try {
    return JSON.parse(localStorage.getItem(PLAN_STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

export function toggleDayCompleted(dayNumber) {
  const completed = getCompletedDays();
  const idx = completed.indexOf(dayNumber);
  if (idx >= 0) {
    completed.splice(idx, 1);
  } else {
    completed.push(dayNumber);
  }
  localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(completed));
  return completed.includes(dayNumber);
}

export function getPlanProgressPercentage() {
  const completed = getCompletedDays();
  return Math.round((completed.length / 365) * 100);
}
