import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const News = () => {
  const [postsToShow, setPostsToShow] = useState([]);

  useEffect(() => {
    // Firebase konfigurace
    const firebaseConfig = {
      databaseURL: 'https://stkpisek-a2a01-default-rtdb.firebaseio.com/',
    };

    // Inicializace Firebase
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
      <div style={styles.container}>
        <h2 style={styles.headline}>Důležité informace:</h2>
        {postsToShow.map((post) => (
          <div key={post.id} style={styles.post}>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postContent}>{post.content}</p>
          </div>
        ))}
      </div>
    )
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  },
  headline: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '15px',
    textAlign: 'center',
  },
  post: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    border: '1px solid #ddd',
  },
  postTitle: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#007bff',
    marginBottom: '5px',
  },
  postContent: {
    fontSize: '16px',
    color: '#555',
  },
};

export default News;
