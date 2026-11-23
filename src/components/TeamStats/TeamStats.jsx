import { cx } from '../../utils/cx';
import styles from './TeamStats.module.css';

export function TeamStats({ items, className }) {
  return (
    <dl className={cx(styles.stats, className)}>
      {items.map((item) => (
        <div key={item.term} className={styles.item}>
          <dt className={styles.term}>{item.term}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
