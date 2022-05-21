import React, { useState, useEffect, useContext } from "react";

const News = (props) => {
  const [postsToShow, setPostsToShow] = useState([]);

  let posts = useContext(AuthContext).posts

  useEffect(() => {
    posts ? setPostsToShow(posts) : setPostsToShow([])
  }, []);

  return (
    <div className="news-post-container">
      <h2 className="homepage-headline">Důležité informace:</h2>
      {postsToShow.map((post) => {
        return (
          <>
            <div className="news-post">
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default News;
