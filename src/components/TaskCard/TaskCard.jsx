import { Link } from 'react-router-dom';
import { TODAY } from '../../data/constants';
import { cx } from '../../utils/cx';
import { formatShortDate } from '../../utils/format';
import { Avatar } from '../Avatar/Avatar';
import { PriorityBadge, TaskTag } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import { StatusSelect } from '../StatusSelect/StatusSelect';
import styles from './TaskCard.module.css';

export function isOverdue(task) {
  return Boolean(task.due) && task.due < TODAY && task.status !== 'done';
}

export function TaskCard({ task, assignee, onStatusChange, preview, className }) {
  const title = task.title.trim();

  return (
    <article className={cx(styles.card, preview && styles.preview, className)}>
      <ul className={styles.labels}>
        <PriorityBadge as="li" priority={task.priority} />
        {task.tags.map((tag) => (
          <TaskTag as="li" key={tag}>{tag}</TaskTag>
        ))}
      </ul>

      <h3 className={cx(styles.title, preview && !title && styles.titleEmpty)}>
        {preview ? (
          title || 'Название задачи'
        ) : (
          <Link className={styles.link} to={`/tasks/${task.id}`}>{title}</Link>
        )}
      </h3>

      <footer className={styles.footer}>
        {task.due ? (
          <time className={cx(styles.due, isOverdue(task) && styles.overdue)} dateTime={task.due}>
            <Icon name="calendar" size="sm" />
            {formatShortDate(task.due)}
          </time>
        ) : (
          <span className={styles.due}>
            <Icon name="calendar" size="sm" />
            Без срока
          </span>
        )}
        <Avatar member={assignee} className={styles.assignee} />
        {!preview && (
          <StatusSelect value={task.status} onChange={(status) => onStatusChange(task.id, status)} />
        )}
      </footer>
    </article>
  );
}
