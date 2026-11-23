import { Link } from 'react-router-dom';
import { cx } from '../../utils/cx';
import { Icon } from '../Icon/Icon';
import styles from './Logo.module.css';

export function Logo({ withName = true, className, iconSize }) {
  return (
    <Link className={cx(styles.logo, className)} to="/" aria-label={withName ? undefined : 'Спринт'}>
      <span className={styles.mark}>
        <Icon name="logo" size={iconSize} />
      </span>
      {withName && <span className={styles.name}>Спринт</span>}
    </Link>
  );
}

export const logoNameClass = styles.name;
