import styles from './Comments.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Comments = ({ prop }) => {
  const [comment, setComment] = useState('');
  const title = prop.title;
  const router = useRouter();
  async function submitComment() {
    if (comment) {
      try {
        const res = await fetch('/api/submitComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, comment }),
        });
        if (res.ok) {
          router.refresh();
        } else {
          throw new Error('An error occurred while submitting the comment');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <h3 className={styles.like_commentsWrapper}>Comments:</h3>
      <input
        type='text'
        placeholder='Add a comment'
        className={styles.commentInput}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        type='button'
        onClick={submitComment}
        className={styles.submitButton}
      >
        Submit
      </button>
      {prop.comments.length === 1 && prop.comments[0] === '' ? (
        <p>No comments yet</p>
      ) : (
        <ul id={styles.commentsSection}>
          {prop.comments.map((comment, index) => (
            <li className={styles.comments} key={index}>
              {comment}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
