import { useState } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../Button/Button';
import { FieldGroup, Input } from '../Field/Field';
import utils from '../../styles/utils.module.css';
import styles from './TagPicker.module.css';

export function TagPicker({ options, value, onChange, onAddOption }) {
  const [newTag, setNewTag] = useState('');

  function toggle(tag) {
    onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);
  }

  function addTag() {
    const tag = newTag.trim();
    if (!tag) return;
    const existing = options.find((t) => t.toLowerCase() === tag.toLowerCase());
    const finalTag = existing ?? tag;
    if (!existing) onAddOption(finalTag);
    if (!value.includes(finalTag)) onChange([...value, finalTag]);
    setNewTag('');
  }

  return (
    <FieldGroup legend="Теги" className={styles.picker}>
      <div className={styles.options}>
        {options.map((tag) => {
          const checked = value.includes(tag);
          return (
            <label key={tag} className={cx(styles.option, checked && styles.checked)}>
              <input
                className={utils.visuallyHidden}
                type="checkbox"
                value={tag}
                checked={checked}
                onChange={() => toggle(tag)}
              />
              {tag}
            </label>
          );
        })}
      </div>
      <div className={styles.new}>
        <Input
          className={styles.newControl}
          value={newTag}
          maxLength={24}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Новый тег"
          aria-label="Новый тег"
        />
        <Button variant="secondary" className={styles.newControl} onClick={addTag} disabled={!newTag.trim()}>
          Добавить
        </Button>
      </div>
    </FieldGroup>
  );
}
