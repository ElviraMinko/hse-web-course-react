import { cx } from '../../utils/cx';
import styles from './PageHeader.module.css';

export function PageHeader({ flow, className, children }) {
  return <header className={cx(styles.header, flow && styles.flow, className)}>{children}</header>;
}

export function PageHeading({ className, as: Tag = 'div', children }) {
  return <Tag className={cx(styles.heading, className)}>{children}</Tag>;
}

export function PageTitle({ className, children }) {
  return <h1 className={cx(styles.title, className)}>{children}</h1>;
}

export function PageSubtitle({ className, children }) {
  return <p className={cx(styles.subtitle, className)}>{children}</p>;
}

export const mobileOnlyClass = styles.mobileOnly;
