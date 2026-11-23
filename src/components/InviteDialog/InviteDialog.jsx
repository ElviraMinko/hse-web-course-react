import { useState } from 'react';
import { Button, IconButton } from '../Button/Button';
import { FormField, Input } from '../Field/Field';
import { Icon } from '../Icon/Icon';
import styles from './InviteDialog.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email }, existingEmails) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Введите имя — хотя бы 2 символа';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Похоже, в адресе опечатка';
  else if (existingEmails.includes(email.trim().toLowerCase())) errors.email = 'Этот участник уже в команде';
  return errors;
}

export function InviteDialog({ existingEmails, onClose, onInvite }) {
  const [values, setValues] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values, existingEmails);
  const showError = (field) => (submitted || touched[field]) && errors[field];

  function handleChange(field) {
    return (e) => setValues((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    onInvite({ name: values.name.trim(), email: values.email.trim().toLowerCase() });
  }

  return (
    <div
      className={styles.dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-title"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.panel}>
        <span className={styles.handle} />
        <header className={styles.header}>
          <h2 className={styles.title} id="invite-title">Пригласить в команду</h2>
          <IconButton label="Закрыть" onClick={onClose}>
            <Icon name="close" size="md" />
          </IconButton>
        </header>
        <p className={styles.description}>Отправим письмо со ссылкой для присоединения к проекту.</p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <FormField label="Имя" htmlFor="invite-name" error={showError('name')}>
            <Input
              id="invite-name"
              autoFocus
              autoComplete="name"
              placeholder="Например, Оля Смирнова"
              value={values.name}
              invalid={Boolean(showError('name'))}
              onChange={handleChange('name')}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            />
          </FormField>
          <FormField label="Email" htmlFor="invite-email" error={showError('email')}>
            <Input
              id="invite-email"
              type="email"
              autoComplete="email"
              placeholder="name@company.ru"
              value={values.email}
              invalid={Boolean(showError('email'))}
              onChange={handleChange('email')}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
          </FormField>
          <div className={styles.actions}>
            <Button variant="secondary" onClick={onClose}>Отмена</Button>
            <Button variant="primary" type="submit">Отправить приглашение</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
