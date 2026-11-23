import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import { Input } from '../Field/Field';
import styles from './SearchField.module.css';

export function SearchField({ value, onChange, placeholder, label, className, autoFocus }) {
  return (
    <form className={cx(styles.search, className)} role="search" onSubmit={(e) => e.preventDefault()}>
      <Icon name="search" size="md" className={styles.icon} />
      <Input
        className={styles.input}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoFocus={autoFocus}
      />
    </form>
  );
}
