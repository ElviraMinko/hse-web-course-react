import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

export function Breadcrumbs({ items }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Навигационная цепочка">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.label} className={styles.item} aria-current={isCurrent ? 'page' : undefined}>
              {isCurrent ? item.label : <Link className={styles.link} to={item.to}>{item.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
