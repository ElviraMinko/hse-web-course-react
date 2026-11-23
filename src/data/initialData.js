export const initialMembers = [
  { id: 'anya', name: 'Аня Ковалёва', email: 'anya@sprint.team', role: 'admin', color: 'indigo', activity: 'в сети' },
  { id: 'dima', name: 'Дима Соколов', email: 'dima@sprint.team', role: 'viewer', color: 'purple', activity: '3 дня назад' },
  { id: 'katya', name: 'Катя Петрова', email: 'katya@sprint.team', role: 'member', color: 'yellow', activity: 'сегодня' },
  { id: 'lev', name: 'Лёва Гринберг', email: 'lev@sprint.team', role: 'member', color: 'green', activity: '2 часа назад' },
  { id: 'misha', name: 'Миша Орлов', email: 'misha@sprint.team', role: 'member', color: 'orange', activity: 'вчера' },
];

export const initialTasks = [
  {
    id: 'spr-36', code: 'SPR-36', title: 'Макет экрана профиля', status: 'backlog', priority: 'medium',
    tags: ['Дизайн'], due: '2026-10-02', assigneeId: 'misha', authorId: 'anya', createdAt: '2026-09-15',
    description: 'Собрать макет экрана профиля: аватар, контакты, список задач участника и настройки уведомлений.',
    comments: [],
  },
  {
    id: 'spr-37', code: 'SPR-37', title: 'Экспорт задач в CSV', status: 'backlog', priority: 'low',
    tags: ['Фича'], due: '2026-10-09', assigneeId: null, authorId: 'katya', createdAt: '2026-09-17',
    description: 'Кнопка на доске, которая выгружает текущие задачи спринта в CSV с учётом активных фильтров.',
    comments: [],
  },
  {
    id: 'spr-38', code: 'SPR-38', title: 'Гайд по онбордингу новых участников', status: 'backlog', priority: 'medium',
    tags: ['Документация'], due: '2026-10-05', assigneeId: 'katya', authorId: 'anya', createdAt: '2026-09-18',
    description: 'Короткий гайд: как получить доступы, где лежат макеты и как устроен процесс ревью.',
    comments: [],
  },
  {
    id: 'spr-41', code: 'SPR-41', title: 'Настроить CI для автотестов', status: 'progress', priority: 'high',
    tags: ['Инфра'], due: '2026-09-26', assigneeId: 'anya', authorId: 'misha', createdAt: '2026-09-16',
    description: 'Нужен пайплайн, который запускает тесты на каждый merge request и не даёт влить ветку с упавшими тестами. Результат прогона должен быть виден прямо в карточке MR.',
    comments: [
      { id: 'c1', authorId: 'misha', text: 'Могу помочь с раннером — у нас есть свободная машина под сборки.', createdAt: '2026-09-22T18:40' },
      { id: 'c2', authorId: 'lev', text: 'Проверил на своей ветке: с кэшем сборка заметно быстрее. Оставляем.', createdAt: '2026-09-23T10:15' },
    ],
  },
  {
    id: 'spr-42', code: 'SPR-42', title: 'Тёмная тема интерфейса', status: 'progress', priority: 'medium',
    tags: ['Дизайн', 'Фронтенд'], due: '2026-09-30', assigneeId: 'misha', authorId: 'anya', createdAt: '2026-09-16',
    description: 'Добавить тёмную тему на основе дизайн-токенов и переключатель в настройках профиля.',
    comments: [],
  },
  {
    id: 'spr-43', code: 'SPR-43', title: 'Уведомления о дедлайнах', status: 'progress', priority: 'low',
    tags: ['Фича'], due: '2026-09-29', assigneeId: 'katya', authorId: 'lev', createdAt: '2026-09-17',
    description: 'Напоминать исполнителю за день до дедлайна и в день дедлайна.',
    comments: [],
  },
  {
    id: 'spr-39', code: 'SPR-39', title: 'Валидация формы приглашения', status: 'review', priority: 'high',
    tags: ['Фронтенд'], due: '2026-09-21', assigneeId: 'lev', authorId: 'anya', createdAt: '2026-09-15',
    description: 'Проверять имя и email до отправки, показывать понятные сообщения об ошибках под полями.',
    comments: [],
  },
  {
    id: 'spr-40', code: 'SPR-40', title: 'Ревью API комментариев', status: 'review', priority: 'medium',
    tags: ['Инфра'], due: '2026-09-25', assigneeId: 'dima', authorId: 'misha', createdAt: '2026-09-16',
    description: 'Посмотреть контракт API комментариев и проверить пагинацию.',
    comments: [],
  },
  {
    id: 'spr-34', code: 'SPR-34', title: 'Починить сортировку в таблице', status: 'done', priority: 'medium',
    tags: ['Баг'], due: '2026-09-18', assigneeId: 'anya', authorId: 'dima', createdAt: '2026-09-15',
    description: 'Сортировка по задачам в таблице команды работала только по возрастанию.',
    comments: [],
  },
  {
    id: 'spr-35', code: 'SPR-35', title: 'Фильтры на доске', status: 'done', priority: 'low',
    tags: ['Фича'], due: '2026-09-19', assigneeId: 'dima', authorId: 'anya', createdAt: '2026-09-15',
    description: 'Фильтры «Все задачи», «Мои» и «Высокий приоритет» над доской.',
    comments: [],
  },
];

export const initialState = {
  tasks: initialTasks,
  members: initialMembers,
  nextTaskNumber: 44,
};
