// SERVIÇO DO PLANO DE LEITURA CATÓLICA 365 DIAS (AVE MARIA)

import { CATHOLIC_PLAN_DAYS, MONTH_NAMES } from './planSchedule.js';
import { getLanguage } from './i18n.js';

const PLAN_STORAGE_KEY = 'avemaria_reading_plan_progress';

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
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(completed));
    }
  } catch (e) {}
  return completed.includes(dayNumber);
}

export function getPlanProgressPercentage() {
  const completed = getCompletedDays();
  return Math.round((completed.length / 365) * 100);
}

export function getReadingPlan() {
  const completedSet = getCompletedDays();
  return CATHOLIC_PLAN_DAYS.map(item => ({
    ...item,
    completed: completedSet.includes(item.day)
  }));
}

export function getReadingPlanByMonth(monthNum) {
  const allDays = getReadingPlan();
  if (!monthNum || monthNum < 1 || monthNum > 12) return allDays;
  return allDays.filter(d => d.month === monthNum);
}

export function getTodayDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return Math.min(Math.max(dayOfYear, 1), 365);
}

export function getTodayPlanItem() {
  const todayDay = getTodayDayOfYear();
  const allDays = getReadingPlan();
  return allDays.find(d => d.day === todayDay) || allDays[0];
}

export function getMonthLabel(monthIndex) {
  const lang = getLanguage();
  const names = MONTH_NAMES[lang] || MONTH_NAMES.pt;
  return names[monthIndex - 1] || `Mês ${monthIndex}`;
}
