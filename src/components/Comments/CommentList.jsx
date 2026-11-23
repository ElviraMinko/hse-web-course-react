import { TODAY } from '../../data/constants';
import { formatCommentTime } from '../../utils/format';
import { Avatar } from '../Avatar/Avatar';
import styles from './Comments.module.css';

export function CommentList({ comments, membersById }) {
  if (comments.length === 0) {
    return <p className={styles.empty}>Комментариев пока нет — напишите первый.</p>;
  }
  return (
    <ol className={styles.list}>
      {comments.map((comment) => {
        const author = membersById[comment.authorId];
        return (
          <li key={comment.id} className={styles.comment}>
            <Avatar member={author ?? null} size="large" />
            <div className={styles.body}>
              <p className={styles.meta}>
                <span className={styles.author}>{author ? author.name : 'Бывший участник'}</span>
                <time className={styles.time} dateTime={comment.createdAt}>
                  {formatCommentTime(comment.createdAt, TODAY)}
                </time>
              </p>
              <p className={styles.text}>{comment.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
