import { cx } from '../../utils/cx';
import styles from './Field.module.css';

export function Input({ invalid, className, ...rest }) {
  return <input className={cx(styles.input, invalid && styles.invalid, className)} {...rest} />;
}

export function Textarea({ invalid, className, ...rest }) {
  return (
    <textarea
      className={cx(styles.input, styles.multiline, invalid && styles.invalid, className)}
      {...rest}
    />
  );
}

export function Select({ options, value, className, placeholder, ...rest }) {
  return (
    <select
      className={cx(styles.input, styles.select, value === '' && styles.placeholder, className)}
      value={value}
      {...rest}
    >
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function FormField({ label, htmlFor, required, hint, error, className, children }) {
  return (
    <div className={cx(styles.field, className)}>
      <div className={styles.head}>
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export function FieldGroup({ legend, className, children }) {
  return (
    <fieldset className={cx(styles.field, className)}>
      <legend className={styles.label}>{legend}</legend>
      {children}
    </fieldset>
  );
}
