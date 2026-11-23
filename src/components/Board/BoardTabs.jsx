import { cx } from '../../utils/cx';
import { StatusDot } from '../Badge/Badge';
import styles from './Board.module.css';

export function BoardTabs({ statuses, counts, active, onChange }) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Статусы задач">
      {statuses.map((status) => (
        <button
          key={status.id}
          type="button"
          role="tab"
          aria-selected={status.id === active}
          className={cx(styles.tab, status.id === active && styles.tabActive)}
          onClick={() => onChange(status.id)}
        >
          <StatusDot status={status.id} className={styles.tabDot} />
          {status.label}
          <span className={cx(styles.count, styles.tabCount)}>{counts[status.id]}</span>
        </button>
      ))}
    </div>
  );
}
