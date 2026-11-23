import { useParams } from 'react-router-dom';
import { PriorityBadge, TaskTag } from '../../components/Badge/Badge';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button, IconButton } from '../../components/Button/Button';
import { CommentForm } from '../../components/Comments/CommentForm';
import { CommentList } from '../../components/Comments/CommentList';
import { Icon } from '../../components/Icon/Icon';
import { AppLayout } from '../../components/Layout/AppLayout';
import { PageHeader, PageHeading, PageTitle, mobileOnlyClass } from '../../components/PageHeader/PageHeader';
import { Panel } from '../../components/Panel/Panel';
import { StatusSelectLarge } from '../../components/StatusSelect/StatusSelect';
import { TaskMeta } from '../../components/TaskMeta/TaskMeta';
import { CURRENT_USER_ID, TODAY } from '../../data/constants';
import { useAppActions, useAppState, useMembersById } from '../../store/AppStore';
import { formatLongDate } from '../../utils/format';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import styles from './TaskPage.module.css';

function nowStamp() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${TODAY}T${hh}:${mm}`;
}

export function TaskPage() {
  const { id } = useParams();
  const { tasks } = useAppState();
  const membersById = useMembersById();
  const { setTaskStatus, addComment } = useAppActions();

  const task = tasks.find((t) => t.id === id);
  if (!task) return <NotFoundPage />;

  const assignee = task.assigneeId ? membersById[task.assigneeId] : null;
  const author = membersById[task.authorId];
  const currentUser = membersById[CURRENT_USER_ID];
  const editTo = `/tasks/${task.id}/edit`;

  function handleComment(text) {
    addComment(task.id, {
      id: `c-${Date.now()}`,
      authorId: CURRENT_USER_ID,
      text,
      createdAt: nowStamp(),
    });
  }

  return (
    <AppLayout flow mainClassName={styles.page}>
      <PageHeader flow className={styles.topbar}>
        <IconButton to="/" label="Назад к доске" className={mobileOnlyClass}>
          <Icon name="back" />
        </IconButton>
        <PageHeading as="p" className={styles.code}>{task.code}</PageHeading>
        <IconButton to={editTo} label="Редактировать" className={mobileOnlyClass}>
          <Icon name="edit" />
        </IconButton>
      </PageHeader>

      <PageHeader className={styles.header}>
        <PageHeading className={styles.heading}>
          <Breadcrumbs items={[{ label: 'Доска', to: '/' }, { label: task.code }]} />
          <PageTitle className={styles.title}>{task.title}</PageTitle>
          <p className={styles.labels}>
            <PriorityBadge priority={task.priority} large suffix="приоритет" suffixClassName={styles.prioritySuffix} />
            {task.tags.map((tag) => <TaskTag key={tag} large>{tag}</TaskTag>)}
            <span className={styles.created}>
              Создана <time dateTime={task.createdAt}>{formatLongDate(task.createdAt)}</time>
            </span>
          </p>
        </PageHeading>
        <div className={styles.actions}>
          <StatusSelectLarge value={task.status} onChange={(status) => setTaskStatus(task.id, status)} />
          <Button variant="secondary" to={editTo} className={styles.edit}>
            <Icon name="edit" size="sm" /> Редактировать
          </Button>
        </div>
      </PageHeader>

      <div className={styles.layout}>
        <Panel title="Описание" className={styles.description}>
          <p className={styles.descriptionText}>
            {task.description || <span className={styles.muted}>Описание не добавлено</span>}
          </p>
        </Panel>

        <Panel title="Комментарии" count={task.comments.length} className={styles.comments}>
          <CommentList comments={task.comments} membersById={membersById} />
          <CommentForm author={currentUser ?? null} onSubmit={handleComment} />
        </Panel>

        <Panel title="Детали" className={styles.meta} titleClassName={styles.metaTitle}>
          <TaskMeta task={task} assignee={assignee} author={author} />
        </Panel>
      </div>
    </AppLayout>
  );
}
