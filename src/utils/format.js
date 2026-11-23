const SHORT_MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const LONG_MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

function parseDate(iso) {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return { year, month, day };
}

export function formatShortDate(iso) {
  const { month, day } = parseDate(iso);
  return `${day} ${SHORT_MONTHS[month - 1]}`;
}

export function formatLongDate(iso) {
  const { month, day } = parseDate(iso);
  return `${day} ${LONG_MONTHS[month - 1]}`;
}

export function plural(count, [one, few, many]) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function getShortName(name) {
  const [first, last] = name.split(/\s+/);
  return last ? `${first} ${last[0]}.` : first;
}

export function formatCommentTime(isoDateTime, todayIso) {
  const date = isoDateTime.slice(0, 10);
  const time = isoDateTime.slice(11, 16);
  const today = new Date(`${todayIso}T00:00:00`);
  const day = new Date(`${date}T00:00:00`);
  const diffDays = Math.round((today - day) / 86400000);
  if (diffDays === 0) return `сегодня, ${time}`;
  if (diffDays === 1) return `вчера, ${time}`;
  return `${formatLongDate(date)}, ${time}`;
}
