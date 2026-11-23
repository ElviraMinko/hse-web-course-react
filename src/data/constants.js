export const TODAY = '2026-09-23';

export const CURRENT_USER_ID = 'anya';

export const SPRINT = {
  name: 'Спринт 14',
  dates: '15 — 28 сентября',
};

export const STATUSES = [
  { id: 'backlog', label: 'Бэклог' },
  { id: 'progress', label: 'В работе' },
  { id: 'review', label: 'На ревью' },
  { id: 'done', label: 'Готово' },
];

export const STATUS_LABELS = Object.fromEntries(STATUSES.map((s) => [s.id, s.label]));

export const PRIORITIES = [
  { id: 'high', label: 'Высокий' },
  { id: 'medium', label: 'Средний' },
  { id: 'low', label: 'Низкий' },
];

export const PRIORITY_LABELS = Object.fromEntries(PRIORITIES.map((p) => [p.id, p.label]));

export const ROLES = [
  { id: 'admin', label: 'Администратор', plural: 'Администраторы' },
  { id: 'member', label: 'Участник', plural: 'Участники' },
  { id: 'viewer', label: 'Наблюдатель', plural: 'Наблюдатели' },
];

export const ROLE_LABELS = Object.fromEntries(ROLES.map((r) => [r.id, r.label]));

export const DEFAULT_TAGS = ['Фронтенд', 'Дизайн', 'Инфра', 'Баг', 'Фича', 'Документация'];

export const AVATAR_COLORS = ['indigo', 'orange', 'green', 'yellow', 'purple', 'sky'];

export const TITLE_MIN = 3;
export const TITLE_MAX = 80;
