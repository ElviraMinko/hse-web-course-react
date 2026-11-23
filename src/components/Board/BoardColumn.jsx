import { cx } from '../../utils/cx';
import { StatusDot } from '../Badge/Badge';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './Board.module.css';

export function BoardColumn({ status, tasks, membersById, onStatusChange, active }) {
  const titleId = `column-${status.id}`;
  return (
    <section className={cx(styles.column, active && styles.columnActive)} aria-labelledby={titleId}>
      <header className={styles.columnHeader}>
        <StatusDot status={status.id} />
        <h2 className={styles.columnTitle} id={titleId}>{status.label}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </header>
      <ul className={styles.columnList}>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard
              task={task}
              assignee={task.assigneeId ? membersById[task.assigneeId] : null}
              onStatusChange={onStatusChange}
            />
          </li>
        ))}
        {tasks.length === 0 && <li className={styles.empty}>Нет задач</li>}
      </ul>
    </section>
  );
}
