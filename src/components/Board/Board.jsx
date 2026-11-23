import { useState } from 'react';
import { STATUSES } from '../../data/constants';
import { BoardColumn } from './BoardColumn';
import { BoardTabs } from './BoardTabs';
import styles from './Board.module.css';

export function Board({ tasks, membersById, onStatusChange }) {
  const [activeTab, setActiveTab] = useState('progress');

  const byStatus = Object.fromEntries(
    STATUSES.map((status) => [status.id, tasks.filter((task) => task.status === status.id)]),
  );
  const counts = Object.fromEntries(STATUSES.map((s) => [s.id, byStatus[s.id].length]));

  return (
    <section className={styles.board} aria-label="Задачи по статусам">
      <BoardTabs statuses={STATUSES} counts={counts} active={activeTab} onChange={setActiveTab} />
      <div className={styles.columns}>
        {STATUSES.map((status) => (
          <BoardColumn
            key={status.id}
            status={status}
            tasks={byStatus[status.id]}
            membersById={membersById}
            onStatusChange={onStatusChange}
            active={status.id === activeTab}
          />
        ))}
      </div>
    </section>
  );
}
