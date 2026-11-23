import { CURRENT_USER_ID } from '../../data/constants';
import { cx } from '../../utils/cx';
import utils from '../../styles/utils.module.css';
import { TeamMemberRow } from './TeamMemberRow';
import styles from './TeamTable.module.css';

function SortButton({ sortKey, sort, onSort, children }) {
  const active = sort.key === sortKey;
  const arrow = active ? (sort.dir === 'asc' ? '↑' : '↓') : '↕';
  return (
    <button type="button" className={cx(styles.sort, active && styles.sortActive)} onClick={() => onSort(sortKey)}>
      {children} <span aria-hidden="true">{arrow}</span>
    </button>
  );
}

function ariaSort(sort, key) {
  if (sort.key !== key) return undefined;
  return sort.dir === 'asc' ? 'ascending' : 'descending';
}

export function TeamTable({ members, taskCounts, sort, onSort, onRoleChange, onRemove }) {
  return (
    <section className={styles.list} aria-label="Список участников">
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.headRow}>
            <th className={styles.heading} scope="col" aria-sort={ariaSort(sort, 'name')}>
              <SortButton sortKey="name" sort={sort} onSort={onSort}>
                <span className={styles.label}>Участник</span>
                <span className={styles.labelShort}>Имя</span>
              </SortButton>
            </th>
            <th className={cx(styles.heading, styles.headingRole)} scope="col">Роль</th>
            <th className={cx(styles.heading, styles.headingTasks)} scope="col" aria-sort={ariaSort(sort, 'tasks')}>
              <SortButton sortKey="tasks" sort={sort} onSort={onSort}>Задачи</SortButton>
            </th>
            <th className={cx(styles.heading, styles.headingActivity)} scope="col">Активность</th>
            <th className={cx(styles.heading, styles.headingActions)} scope="col">
              <span className={utils.visuallyHidden}>Действия</span>
            </th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {members.map((member) => (
            <TeamMemberRow
              key={member.id}
              member={member}
              taskCount={taskCounts[member.id] ?? 0}
              isCurrentUser={member.id === CURRENT_USER_ID}
              onRoleChange={onRoleChange}
              onRemove={onRemove}
            />
          ))}
          {members.length === 0 && (
            <tr className={styles.row}>
              <td className={cx(styles.cell, styles.empty)} colSpan={5}>Никого не нашли</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
