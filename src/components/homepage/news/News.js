import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import styles from './News.module.css';

const News = () => {
  const [postsToShow, setPostsToShow] = useState([]);

  useEffect(() => {
    const firebaseConfig = {
      databaseURL: 'https://stkpisek-a2a01-default-rtdb.firebaseio.com/',
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const postsRef = ref(database, 'posts');

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const currentDateTime = new Date();

      const filteredPosts = data
        ? Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .filter((post) => {
              const expirationDateTime = post.expiration
                ? new Date(post.expiration)
                : null;
              return (
                !expirationDateTime || expirationDateTime > currentDateTime
              );
            })
        : [];

      setPostsToShow(filteredPosts);
    });
  }, []);

  return (
    postsToShow.length > 0 && (
      <section className={styles.newsSection}>
        <div className={styles.newsContainer}>
          <h2 className={styles.newsHeadline}>Důležité informace:</h2>
          {postsToShow.map((post) => (
            <article key={post.id} className={styles.newsPost}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, '<br />'),
                }}
              ></div>
            </article>
          ))}
        </div>
      </section>
    )
  );
};

export default News;
