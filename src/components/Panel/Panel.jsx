import { cx } from '../../utils/cx';
import styles from './Panel.module.css';

export function Panel({ title, count, className, titleClassName, children, ...rest }) {
  return (
    <section className={cx(styles.panel, className)} {...rest}>
      {title && (
        <h2 className={cx(styles.title, titleClassName)}>
          {title}
          {count !== undefined && <span className={styles.count}> · {count}</span>}
        </h2>
      )}
      {children}
    </section>
  );
}
