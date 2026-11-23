import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { FilterChips } from '../../components/FilterChips/FilterChips';
import { Icon } from '../../components/Icon/Icon';
import { InviteDialog } from '../../components/InviteDialog/InviteDialog';
import { AppLayout } from '../../components/Layout/AppLayout';
import { PageHeader, PageHeading, PageSubtitle, PageTitle } from '../../components/PageHeader/PageHeader';
import { SearchField } from '../../components/SearchField/SearchField';
import { TeamStats } from '../../components/TeamStats/TeamStats';
import { TeamTable } from '../../components/TeamTable/TeamTable';
import { CURRENT_USER_ID, ROLES } from '../../data/constants';
import { useAppActions, useAppState } from '../../store/AppStore';
import { plural } from '../../utils/format';
import utils from '../../styles/utils.module.css';
import styles from './TeamPage.module.css';

const ROLE_FILTERS = [{ value: 'all', label: 'Все' }, ...ROLES.map((r) => ({ value: r.id, label: r.plural }))];

export function TeamPage() {
  const { members, tasks } = useAppState();
  const { setMemberRole, removeMember, inviteMember } = useAppActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' });
  const [notice, setNotice] = useState('');

  const isInviteOpen = searchParams.get('invite') === '1';
  const currentUser = members.find((m) => m.id === CURRENT_USER_ID);
  const isAdmin = currentUser?.role === 'admin';

  const activeTasks = useMemo(() => tasks.filter((t) => t.status !== 'done'), [tasks]);
  const taskCounts = useMemo(() => {
    const counts = {};
    activeTasks.forEach((t) => {
      if (t.assigneeId) counts[t.assigneeId] = (counts[t.assigneeId] ?? 0) + 1;
    });
    return counts;
  }, [activeTasks]);

  const visibleMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = members.filter(
      (m) =>
        (roleFilter === 'all' || m.role === roleFilter) &&
        (!q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)),
    );
    const factor = sort.dir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sort.key === 'tasks') {
        const diff = (taskCounts[a.id] ?? 0) - (taskCounts[b.id] ?? 0);
        if (diff !== 0) return diff * factor;
      }
      return a.name.localeCompare(b.name, 'ru') * (sort.key === 'name' ? factor : 1);
    });
  }, [members, query, roleFilter, sort, taskCounts]);

  function handleSort(key) {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  }

  function closeInvite() {
    setSearchParams({}, { replace: true });
  }

  function handleInvite(member) {
    inviteMember(member);
    setNotice(`Приглашение отправлено на ${member.email}`);
    closeInvite();
  }

  function handleRemove(id) {
    const member = members.find((m) => m.id === id);
    removeMember(id);
    if (member) setNotice(`${member.name} удалён(а) из команды`);
  }

  const memberWord = plural(members.length, ['участник', 'участника', 'участников']);
  const taskWord = plural(activeTasks.length, ['задача', 'задачи', 'задач']);
  const adminCount = members.filter((m) => m.role === 'admin').length;

  return (
    <AppLayout mainClassName={styles.page}>
      <PageHeader className={styles.header}>
        <PageHeading className={styles.heading}>
          <PageSubtitle className={styles.subtitle}>Роли и доступ к проекту</PageSubtitle>
          <PageTitle className={styles.title}>Команда</PageTitle>
          <p className={styles.summary}>
            {members.length} {memberWord} · {activeTasks.length} {taskWord} в работе
          </p>
        </PageHeading>
        {isAdmin && (
          <Button variant="primary" className={styles.invite} onClick={() => setSearchParams({ invite: '1' })}>
            <Icon name="invite" size="md" />
            <span className={styles.inviteLabel}>Пригласить участника</span>
          </Button>
        )}
      </PageHeader>

      <TeamStats
        items={[
          { term: 'Участников', value: members.length },
          { term: 'Администраторов', value: adminCount },
          { term: 'Задач в работе у команды', value: activeTasks.length },
        ]}
      />

      <div className={styles.toolbar}>
        <SearchField
          className={styles.search}
          value={query}
          onChange={setQuery}
          placeholder="Имя или email"
          label="Поиск участников"
        />
        <FilterChips
          legend="Фильтр по роли"
          className={styles.chips}
          options={ROLE_FILTERS}
          value={roleFilter}
          onChange={setRoleFilter}
        />
      </div>

      <p className={utils.visuallyHidden} role="status">{notice}</p>

      <TeamTable
        members={visibleMembers}
        taskCounts={taskCounts}
        sort={sort}
        onSort={handleSort}
        onRoleChange={setMemberRole}
        onRemove={handleRemove}
      />

      {isInviteOpen && isAdmin && (
        <InviteDialog
          existingEmails={members.map((m) => m.email.toLowerCase())}
          onClose={closeInvite}
          onInvite={handleInvite}
        />
      )}
    </AppLayout>
  );
}
