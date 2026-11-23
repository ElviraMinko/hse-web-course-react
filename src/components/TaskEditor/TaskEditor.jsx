import { useState } from 'react';
import { DEFAULT_TAGS, STATUSES, TITLE_MAX, TITLE_MIN, TODAY } from '../../data/constants';
import { useAllTags, useAppState } from '../../store/AppStore';
import { Button } from '../Button/Button';
import { FormField, Input, Select, Textarea } from '../Field/Field';
import { PriorityPicker } from '../PriorityPicker/PriorityPicker';
import { TagPicker } from '../TagPicker/TagPicker';
import { TaskPreview } from '../TaskPreview/TaskPreview';
import styles from './TaskEditor.module.css';

export const EMPTY_TASK = {
  title: '',
  description: '',
  status: 'backlog',
  priority: 'medium',
  assigneeId: '',
  due: '',
  tags: [],
};

const STATUS_OPTIONS = STATUSES.map((s) => ({ value: s.id, label: s.label }));

function validate(values, initial) {
  const errors = {};
  const titleLength = values.title.trim().length;
  if (titleLength < TITLE_MIN || titleLength > TITLE_MAX) {
    errors.title = `Добавьте название — от ${TITLE_MIN} до ${TITLE_MAX} символов`;
  }
  if (values.due && values.due < TODAY && values.due !== initial.due) {
    errors.due = 'Дедлайн не может быть в прошлом';
  }
  return errors;
}

export function TaskEditor({ formId, initialValues = EMPTY_TASK, submitLabel, cancelTo, onSubmit }) {
  const { members } = useAppState();
  const baseTags = useAllTags(DEFAULT_TAGS);

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [extraTags, setExtraTags] = useState([]);

  const errors = validate(values, initialValues);
  const showError = (field) => (submitted || touched[field]) && errors[field];
  const tagOptions = [...baseTags, ...extraTags.filter((t) => !baseTags.includes(t))];
  const assignee = members.find((m) => m.id === values.assigneeId) ?? null;
  const memberOptions = members.map((m) => ({ value: m.id, label: m.name }));

  function setField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function touch(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      assigneeId: values.assigneeId || null,
    });
  }

  function handleReset(e) {
    e.preventDefault();
    setValues(EMPTY_TASK);
    setTouched({});
    setSubmitted(false);
  }

  return (
    <div className={styles.editor}>
      <form className={styles.form} id={formId} onSubmit={handleSubmit} onReset={handleReset} noValidate>
        <FormField
          label="Название"
          htmlFor="title"
          required
          hint={`${values.title.length} / ${TITLE_MAX}`}
          error={showError('title')}
        >
          <Input
            id="title"
            value={values.title}
            maxLength={TITLE_MAX}
            invalid={Boolean(showError('title'))}
            onChange={(e) => setField('title', e.target.value)}
            onBlur={() => touch('title')}
            placeholder="Например, «Сверстать экран команды»"
          />
        </FormField>

        <FormField label="Описание" htmlFor="description">
          <Textarea
            id="description"
            className={styles.description}
            rows={4}
            value={values.description}
            onChange={(e) => setField('description', e.target.value)}
            placeholder="Что нужно сделать и как понять, что готово"
          />
        </FormField>

        <div className={styles.row}>
          <FormField label="Статус" htmlFor="status">
            <Select
              id="status"
              options={STATUS_OPTIONS}
              value={values.status}
              onChange={(e) => setField('status', e.target.value)}
            />
          </FormField>
          <PriorityPicker value={values.priority} onChange={(p) => setField('priority', p)} />
        </div>

        <div className={styles.row}>
          <FormField label="Исполнитель" htmlFor="assignee">
            <Select
              id="assignee"
              options={memberOptions}
              placeholder="Выберите участника"
              value={values.assigneeId}
              onChange={(e) => setField('assigneeId', e.target.value)}
            />
          </FormField>
          <FormField label="Дедлайн" htmlFor="due" error={showError('due')}>
            <Input
              id="due"
              type="date"
              min={TODAY}
              value={values.due}
              invalid={Boolean(showError('due'))}
              onChange={(e) => {
                setField('due', e.target.value);
                touch('due');
              }}
            />
          </FormField>
        </div>

        <TagPicker
          options={tagOptions}
          value={values.tags}
          onChange={(tags) => setField('tags', tags)}
          onAddOption={(tag) => setExtraTags((prev) => [...prev, tag])}
        />

        <div className={styles.actions}>
          <Button variant="secondary" type="reset" className={styles.desktopOnly}>
            Очистить
          </Button>
          <Button variant="secondary" to={cancelTo} className={styles.desktopOnly}>
            Отмена
          </Button>
          <Button variant="primary" type="submit" className={styles.submit}>
            {submitLabel}
          </Button>
        </div>
      </form>

      <TaskPreview task={{ ...values, assigneeId: values.assigneeId || null }} assignee={assignee} />
    </div>
  );
}
