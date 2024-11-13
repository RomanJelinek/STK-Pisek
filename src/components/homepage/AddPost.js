// pages/addPost.js
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import Link from 'next/link';

// Firebase konfigurace
const firebaseConfig = {
  databaseURL: 'https://stkpisek-a2a01-default-rtdb.firebaseio.com/',
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Heslo, které musí uživatel zadat
const ACCESS_PASSWORD = 'nejlepsiMaminka';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expiration, setExpiration] = useState('');
  const [status, setStatus] = useState('');
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // Načítání všech příspěvků z databáze
  useEffect(() => {
    if (isAuthenticated) {
      const postsRef = ref(database, 'posts');
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        const postsArray = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];
        setPosts(postsArray);
      });
    }
  }, [isAuthenticated]);

  // Přidání nového příspěvku
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Přidávám příspěvek...');

    try {
      const postsRef = ref(database, 'posts');
      await push(postsRef, {
        title,
        content,
        expiration,
        createdAt: new Date().toISOString(),
      });

      setStatus('Příspěvek byl úspěšně přidán!');
      setTitle('');
      setContent('');
      setExpiration('');
    } catch (error) {
      setStatus(`Chyba: ${error.message}`);
    }
  };

  // Smazání příspěvku
  const handleDelete = async (postId) => {
    try {
      await remove(ref(database, `posts/${postId}`));
      setStatus('Příspěvek byl úspěšně smazán!');
    } catch (error) {
      setStatus(`Chyba: ${error.message}`);
    }
  };

  // Ověření hesla
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      alert('Nesprávné heslo, zkuste to znovu.');
      setPasswordInput('');
    }
  };

  return (
    <div style={styles.container}>
      {!isAuthenticated ? (
        <form onSubmit={handlePasswordSubmit} style={styles.passwordForm}>
          <h2>Zadejte heslo pro přístup:</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Heslo"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Potvrdit
          </button>
        </form>
      ) : (
        <>
          <h1 style={styles.title}>Přidat nový příspěvek</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Název příspěvku"
              required
              style={styles.input}
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Obsah příspěvku"
              required
              style={styles.textarea}
            ></textarea>
            <label style={styles.label}>
              Datum a čas expirace (po tomto datu se příspěvek přestane
              zobrazovat):
            </label>
            <input
              type="datetime-local"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Přidat příspěvek
            </button>
          </form>
          <p>{status}</p>
          {posts.length > 0 && (
            <h2 style={styles.subtitle}>Všechny příspěvky</h2>
          )}
          <div style={styles.postsContainer}>
            {posts.map((post) => (
              <div key={post.id} style={styles.post}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>
                  <strong>Expiruje:</strong> {post.expiration || 'Bez expirace'}
                </p>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={styles.deleteButton}
                >
                  Smazat
                </button>
              </div>
            ))}
          </div>
          <Link href="/" style={styles.homeLink}>
            Zpět na hlavní stránku
          </Link>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  passwordForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    minHeight: '100px',
  },
  label: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  post: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '5px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
  homeLink: {
    display: 'block',
    marginTop: '20px',
    textAlign: 'center',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};
