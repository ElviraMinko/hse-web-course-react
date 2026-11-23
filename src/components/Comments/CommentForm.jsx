import { useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { Textarea } from '../Field/Field';
import { Icon } from '../Icon/Icon';
import styles from './Comments.module.css';

export function CommentForm({ author, onSubmit }) {
  const [text, setText] = useState('');
  const isEmpty = text.trim() === '';

  function submit() {
    if (isEmpty) return;
    onSubmit(text.trim());
    setText('');
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Avatar member={author} size="large" className={styles.formAvatar} />
      <div className={styles.fields}>
        <Textarea
          className={styles.textarea}
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Напишите комментарий — Enter отправляет, Shift+Enter переносит строку"
          aria-label="Новый комментарий"
        />
        <Button variant="primary" type="submit" className={styles.submit} disabled={isEmpty}>
          <span className={styles.submitText}>Отправить</span>
          <Icon name="send" className={styles.submitIcon} />
        </Button>
      </div>
    </form>
  );
}
