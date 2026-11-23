import { PRIORITY_LABELS } from '../../data/constants';
import { cx } from '../../utils/cx';
import styles from './Badge.module.css';

const DOT_CLASSES = {
  backlog: styles.dotBacklog,
  progress: styles.dotProgress,
  review: styles.dotReview,
  done: styles.dotDone,
};

export function PriorityBadge({ priority, large, suffix, suffixClassName, as: Tag = 'span' }) {
  return (
    <Tag className={cx(styles.pill, styles.priority, styles[priority], large && styles.large)}>
      {PRIORITY_LABELS[priority]}
      {suffix && <span className={cx(styles.suffix, suffixClassName)}>{suffix}</span>}
    </Tag>
  );
}

export function TaskTag({ children, large, as: Tag = 'span' }) {
  return <Tag className={cx(styles.pill, styles.tag, large && styles.large)}>{children}</Tag>;
}

export function StatusDot({ status, className }) {
  return <span className={cx(styles.dot, DOT_CLASSES[status], className)} />;
}

export function MemberBadge({ children }) {
  return <span className={styles.member}>{children}</span>;
}
