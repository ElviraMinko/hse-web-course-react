import { useId } from 'react';
import { PRIORITIES } from '../../data/constants';
import { cx } from '../../utils/cx';
import { FieldGroup } from '../Field/Field';
import utils from '../../styles/utils.module.css';
import styles from './PriorityPicker.module.css';

export function PriorityPicker({ value, onChange }) {
  const name = useId();
  return (
    <FieldGroup legend="Приоритет">
      <div className={styles.options}>
        {PRIORITIES.map((priority) => (
          <label key={priority.id} className={cx(styles.option, value === priority.id && styles.checked)}>
            <input
              className={utils.visuallyHidden}
              type="radio"
              name={name}
              value={priority.id}
              checked={value === priority.id}
              onChange={() => onChange(priority.id)}
            />
            <span className={cx(styles.dot, styles[priority.id])} />
            {priority.label}
          </label>
        ))}
      </div>
    </FieldGroup>
  );
}
