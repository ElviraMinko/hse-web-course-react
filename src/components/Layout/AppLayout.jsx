import { cx } from '../../utils/cx';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './AppLayout.module.css';

export function AppLayout({ flow, mainClassName, children }) {
  return (
    <div className={styles.app}>
      <Sidebar className={flow ? styles.sidebarFlow : undefined} />
      <main className={cx(styles.main, flow && styles.mainFlow, mainClassName)}>{children}</main>
    </div>
  );
}
