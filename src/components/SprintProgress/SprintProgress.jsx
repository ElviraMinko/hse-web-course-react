import styles from './SprintProgress.module.css';

export function SprintProgress({ done, total }) {
  return (
    <div className={styles.progress}>
      <p className={styles.caption}>
        <span className={styles.label}>Выполнено</span>
        <span>{done} из {total}</span>
      </p>
      <progress className={styles.bar} max={total || 1} value={done}>
        {done} из {total}
      </progress>
    </div>
  );
}
