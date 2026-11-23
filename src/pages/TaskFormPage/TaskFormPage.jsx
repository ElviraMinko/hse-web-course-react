import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button, IconButton } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { AppLayout } from '../../components/Layout/AppLayout';
import { PageHeader, PageHeading, PageTitle, mobileOnlyClass } from '../../components/PageHeader/PageHeader';
import { TaskEditor } from '../../components/TaskEditor/TaskEditor';
import { CURRENT_USER_ID, TODAY } from '../../data/constants';
import { useAppActions, useAppState } from '../../store/AppStore';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import styles from './TaskFormPage.module.css';

const FORM_ID = 'task-form';

export function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useAppState();
  const { createTask, updateTask } = useAppActions();

  const task = id ? tasks.find((t) => t.id === id) : null;
  if (id && !task) return <NotFoundPage />;

  const isEdit = Boolean(task);
  const backTo = isEdit ? `/tasks/${task.id}` : '/';
  const title = isEdit ? 'Редактирование' : 'Новая задача';

  const initialValues = isEdit
    ? {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assigneeId: task.assigneeId ?? '',
        due: task.due ?? '',
        tags: task.tags,
      }
    : undefined;

  function handleSubmit(values) {
    if (isEdit) {
      updateTask(task.id, values);
      navigate(`/tasks/${task.id}`);
    } else {
      createTask({ ...values, authorId: CURRENT_USER_ID, createdAt: TODAY });
      navigate('/');
    }
  }

  const crumbs = isEdit
    ? [{ label: 'Доска', to: '/' }, { label: task.code, to: backTo }, { label: 'Редактирование' }]
    : [{ label: 'Доска', to: '/' }, { label: 'Новая задача' }];

  return (
    <AppLayout flow mainClassName={styles.page}>
      <PageHeader flow>
        <IconButton to={backTo} label="Закрыть" className={mobileOnlyClass}>
          <Icon name="close" />
        </IconButton>
        <PageHeading>
          <Breadcrumbs items={crumbs} />
          <PageTitle>{title}</PageTitle>
        </PageHeading>
        <Button variant="text" type="reset" form={FORM_ID} className={mobileOnlyClass}>
          Очистить
        </Button>
      </PageHeader>

      <TaskEditor
        key={id ?? 'new'}
        formId={FORM_ID}
        initialValues={initialValues}
        submitLabel={isEdit ? 'Сохранить' : 'Создать задачу'}
        cancelTo={backTo}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
}
