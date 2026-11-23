import { ROLES } from '../../data/constants';
import { cx } from '../../utils/cx';
import { plural } from '../../utils/format';
import { Avatar } from '../Avatar/Avatar';
import { MemberBadge } from '../Badge/Badge';
import { IconButton } from '../Button/Button';
import { Select } from '../Field/Field';
import { Icon } from '../Icon/Icon';
import styles from './TeamTable.module.css';

const ROLE_OPTIONS = ROLES.map((r) => ({ value: r.id, label: r.label }));

export function TeamMemberRow({ member, taskCount, isCurrentUser, onRoleChange, onRemove }) {
  return (
    <tr className={styles.row}>
      <td className={cx(styles.cell, styles.cellPerson)}>
        <div className={styles.person}>
          <Avatar member={member} size="xlarge" className={styles.avatar} />
          <div className={styles.identity}>
            <span className={styles.name}>
              {member.name} {isCurrentUser && <MemberBadge>Вы</MemberBadge>}
            </span>
            <a className={styles.email} href={`mailto:${member.email}`}>{member.email}</a>
          </div>
        </div>
      </td>
      <td className={cx(styles.cell, styles.cellRole)}>
        <Select
          className={styles.roleSelect}
          options={ROLE_OPTIONS}
          value={member.role}
          onChange={(e) => onRoleChange(member.id, e.target.value)}
          disabled={isCurrentUser}
          aria-label={`Роль: ${member.name}`}
        />
      </td>
      <td className={cx(styles.cell, styles.cellTasks)}>
        {taskCount}
        <span className={styles.tasksWord}> {plural(taskCount, ['задача', 'задачи', 'задач'])}</span>
      </td>
      <td className={cx(styles.cell, styles.cellActivity)}>{member.activity}</td>
      <td className={cx(styles.cell, styles.cellActions)}>
        {!isCurrentUser && (
          <IconButton tone="danger" label={`Удалить из команды: ${member.name}`} onClick={() => onRemove(member.id)}>
            <Icon name="delete" size="md" />
          </IconButton>
        )}
      </td>
    </tr>
  );
}
