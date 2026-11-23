import { Link } from 'react-router-dom';
import { cx } from '../../utils/cx';
import styles from './Button.module.css';

export function Button({ variant = 'secondary', to, className, type = 'button', children, ...rest }) {
  const classes = cx(styles.button, styles[variant], className);
  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  );
}

export function IconButton({ to, tone, label, className, type = 'button', children, ...rest }) {
  const classes = cx(styles.iconButton, tone && styles[tone], className);
  if (to) {
    return (
      <Link className={classes} to={to} aria-label={label} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} type={type} aria-label={label} {...rest}>
      {children}
    </button>
  );
}
