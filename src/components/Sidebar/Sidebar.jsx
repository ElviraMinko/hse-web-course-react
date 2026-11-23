import { Link, useLocation } from 'react-router-dom';
import { CURRENT_USER_ID, ROLE_LABELS, SPRINT } from '../../data/constants';
import { useAppState } from '../../store/AppStore';
import { cx } from '../../utils/cx';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import styles from './Sidebar.module.css';

function getCurrentSection(pathname) {
  if (pathname === '/tasks/new') return 'new';
  if (pathname.startsWith('/team')) return 'team';
  return 'board';
}

const NAV_ITEMS = [
  { id: 'board', to: '/', icon: 'board', label: 'Доска' },
  { id: 'new', to: '/tasks/new', icon: 'plus', label: 'Новая задача', short: 'Создать' },
  { id: 'team', to: '/team', icon: 'team', label: 'Команда' },
];

export function Sidebar({ className }) {
  const { pathname } = useLocation();
  const { members } = useAppState();
  const current = getCurrentSection(pathname);
  const user = members.find((m) => m.id === CURRENT_USER_ID);

  return (
    <aside className={cx(styles.sidebar, className)}>
      <Logo className={styles.logo} />

      <nav className={styles.nav} aria-label="Основная навигация">
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => {
            const isCurrent = item.id === current;
            return (
              <li key={item.id}>
                <Link
                  className={cx(styles.navLink, item.short && styles.create, isCurrent && styles.current)}
                  to={item.to}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  <Icon name={item.icon} className={styles.navIcon} />
                  <span className={styles.navLabel}>{item.label}</span>
                  {item.short && <span className={styles.navLabelShort}>{item.short}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className={styles.sprint}>
        <h2 className={styles.sprintCaption}>Текущий спринт</h2>
        <p className={styles.sprintName}>{SPRINT.name}</p>
        <p className={styles.sprintDates}>{SPRINT.dates}</p>
      </section>

      {user && (
        <div className={styles.user}>
          <Avatar member={user} size="large" />
          <p className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>{ROLE_LABELS[user.role]}</span>
          </p>
        </div>
      )}
    </aside>
  );
}
