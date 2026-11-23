import { cx } from '../../utils/cx';
import { getInitials } from '../../utils/format';
import styles from './Avatar.module.css';

export function Avatar({ member, size, className }) {
  if (!member) {
    return (
      <span className={cx(styles.avatar, size && styles[size], styles.unassigned, className)} title="Не назначен">
        —
      </span>
    );
  }
  return (
    <span className={cx(styles.avatar, size && styles[size], styles[member.color], className)} title={member.name}>
      {getInitials(member.name)}
    </span>
  );
}
