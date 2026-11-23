import { STATUSES } from '../../data/constants';
import { cx } from '../../utils/cx';
import styles from './StatusSelect.module.css';

export function StatusSelect({ value, onChange, className }) {
  return (
    <select
      className={cx(styles.select, className)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Статус задачи"
    >
      {STATUSES.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
}

export function StatusSelectLarge({ value, onChange, className }) {
  return (
    <select
      className={cx(styles.large, styles[value], className)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Статус задачи"
    >
      {STATUSES.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
