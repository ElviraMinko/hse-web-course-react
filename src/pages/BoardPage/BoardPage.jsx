import { useMemo, useState } from 'react';
import { Board } from '../../components/Board/Board';
import { Button, IconButton } from '../../components/Button/Button';
import { FilterChips } from '../../components/FilterChips/FilterChips';
import { Icon } from '../../components/Icon/Icon';
import { AppLayout } from '../../components/Layout/AppLayout';
import { Logo } from '../../components/Logo/Logo';
import { PageHeader, PageHeading, PageSubtitle, PageTitle } from '../../components/PageHeader/PageHeader';
import { SearchField } from '../../components/SearchField/SearchField';
import { SprintProgress } from '../../components/SprintProgress/SprintProgress';
import { CURRENT_USER_ID, SPRINT } from '../../data/constants';
import { useAppActions, useAppState, useMembersById } from '../../store/AppStore';
import { cx } from '../../utils/cx';
import styles from './BoardPage.module.css';

const FILTERS = [
  { value: 'all', label: 'Все задачи' },
  { value: 'mine', label: 'Мои' },
  { value: 'high', label: 'Высокий приоритет' },
];

function matchesFilter(task, filter) {
  if (filter === 'mine') return task.assigneeId === CURRENT_USER_ID;
  if (filter === 'high') return task.priority === 'high';
  return true;
}

function matchesQuery(task, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return task.title.toLowerCase().includes(q) || task.tags.some((tag) => tag.toLowerCase().includes(q));
}

export function BoardPage() {
  const { tasks } = useAppState();
  const membersById = useMembersById();
  const { setTaskStatus, reset } = useAppActions();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);

  const visibleTasks = useMemo(
    () => tasks.filter((task) => matchesFilter(task, filter) && matchesQuery(task, query.trim())),
    [tasks, filter, query],
  );

  const doneCount = tasks.filter((task) => task.status === 'done').length;
  const progressText = `выполнено ${doneCount} из ${tasks.length}`;

  function handleReset() {
    reset();
    setQuery('');
    setFilter('all');
  }

  return (
    <AppLayout mainClassName={styles.page}>
      <PageHeader className={styles.header}>
        <Logo withName={false} iconSize="md" className={styles.headerLogo} />
        <PageHeading className={styles.heading}>
          <PageSubtitle className={styles.subtitle}>
            {SPRINT.name} ·{' '}
            <span className={styles.dates}>{SPRINT.dates}</span>
            <span className={styles.done}>{progressText}</span>
          </PageSubtitle>
          <PageTitle className={styles.title}>Доска задач</PageTitle>
        </PageHeading>
        <IconButton
          label={searchOpen ? 'Скрыть поиск' : 'Поиск'}
          className={cx(styles.searchToggle, searchOpen && styles.searchToggleActive)}
          aria-pressed={searchOpen}
          onClick={() => setSearchOpen((open) => !open)}
        >
          <Icon name={searchOpen ? 'close' : 'search'} />
        </IconButton>
        <div className={styles.actions}>
          <SprintProgress done={doneCount} total={tasks.length} />
          <Button variant="secondary" to="/team?invite=1" className={styles.invite}>
            <Icon name="invite" size="md" /> Пригласить
          </Button>
          <Button variant="primary" to="/tasks/new" className={styles.create}>
            <Icon name="plus" size="md" /> Новая задача
          </Button>
        </div>
      </PageHeader>

      <div className={cx(styles.toolbar, searchOpen && styles.toolbarSearchOpen)}>
        <SearchField
          className={styles.search}
          value={query}
          onChange={setQuery}
          placeholder="Поиск по названию или тегу"
          label="Поиск по задачам"
          autoFocus={searchOpen}
        />
        <FilterChips legend="Фильтр задач" className={styles.chips} options={FILTERS} value={filter} onChange={setFilter} />
        <Button variant="quiet" className={styles.reset} onClick={handleReset}>
          Сбросить данные
        </Button>
      </div>

      <Board tasks={visibleTasks} membersById={membersById} onStatusChange={setTaskStatus} />
    </AppLayout>
  );
}
