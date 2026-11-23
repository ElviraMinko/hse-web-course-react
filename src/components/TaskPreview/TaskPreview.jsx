import { STATUS_LABELS } from '../../data/constants';
import { StatusDot } from '../Badge/Badge';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskPreview.module.css';

export function TaskPreview({ task, assignee }) {
  return (
    <aside className={styles.preview}>
      <h2 className={styles.caption}>Так задача появится на доске</h2>
      <TaskCard task={task} assignee={assignee} preview />
      <p className={styles.column}>
        <StatusDot status={task.status} /> Колонка «{STATUS_LABELS[task.status]}»
      </p>
    </aside>
  );
}
