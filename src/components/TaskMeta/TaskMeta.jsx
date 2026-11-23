import { Link } from 'react-router-dom';
import { STATUS_LABELS } from '../../data/constants';
import { cx } from '../../utils/cx';
import { formatLongDate, getShortName } from '../../utils/format';
import { Avatar } from '../Avatar/Avatar';
import { PriorityBadge, StatusDot, TaskTag } from '../Badge/Badge';
import styles from './TaskMeta.module.css';

function MetaItem({ term, className, children }) {
  return (
    <div className={cx(styles.item, className)}>
      <dt className={styles.term}>{term}</dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}

export function TaskMeta({ task, assignee, author }) {
  return (
    <dl className={styles.meta}>
      <MetaItem term="Статус" className={styles.desktopOnly}>
        <StatusDot status={task.status} /> {STATUS_LABELS[task.status]}
      </MetaItem>
      <MetaItem term="Исполнитель" className={styles.assignee}>
        {assignee ? (
          <Link className={styles.person} to="/team">
            <Avatar member={assignee} className={styles.avatar} />
            <span className={styles.name}>{assignee.name}</span>
            <span className={styles.nameShort}>{getShortName(assignee.name)}</span>
          </Link>
        ) : (
          <span className={styles.muted}>Не назначен</span>
        )}
      </MetaItem>
      <MetaItem term="Автор" className={styles.author}>
        {author ? author.name : '—'}
      </MetaItem>
      <MetaItem term="Дедлайн" className={styles.due}>
        {task.due ? <time dateTime={task.due}>{formatLongDate(task.due)}</time> : 'Без срока'}
      </MetaItem>
      <MetaItem term="Создана" className={styles.created}>
        <time dateTime={task.createdAt}>{formatLongDate(task.createdAt)}</time>
      </MetaItem>
      <MetaItem term="Приоритет" className={styles.desktopOnly}>
        <PriorityBadge priority={task.priority} large />
      </MetaItem>
      <MetaItem term="Теги" className={styles.desktopOnly}>
        {task.tags.length > 0 ? (
          <span className={styles.tags}>
            {task.tags.map((tag) => <TaskTag key={tag} large>{tag}</TaskTag>)}
          </span>
        ) : (
          <span className={styles.muted}>—</span>
        )}
      </MetaItem>
    </dl>
  );
}
