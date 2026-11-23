import { useId } from 'react';
import { cx } from '../../utils/cx';
import utils from '../../styles/utils.module.css';
import styles from './FilterChips.module.css';

export function FilterChips({ legend, options, value, onChange, className }) {
  const name = useId();
  return (
    <fieldset className={cx(styles.chips, className)}>
      <legend className={utils.visuallyHidden}>{legend}</legend>
      {options.map((option) => (
        <label
          key={option.value}
          className={cx(styles.option, option.value === value && styles.checked)}
        >
          <input
            className={utils.visuallyHidden}
            type="radio"
            name={name}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}
