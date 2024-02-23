// React components/Home.js

// Home.js
import React, { useState, useEffect } from 'react';
import './Home.css'; // Import custom CSS for styling

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ id: '', title: '', description: '', scheduledTime: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts');
      const data = await response.json();
      const postsWithCounts = data.map(post => ({ ...post, like: 0, share: 0, comment: 0 }));
      setPosts(postsWithCounts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async () => {
    try {
      await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });
      fetchPosts(); // Refresh the posts after creating a new one
      setNewPost({ id: '', title: '', description: '', scheduledTime: '' }); // Clear the form
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, like: post.like + 1 } : post
      )
    );
  };

  const handleComment = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comment: post.comment + 1 } : post
      )
    );
  };

  const handleShare = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, share: post.share + 1 } : post
      )
    );
  };

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="header">Social Media Dashboard</h1>
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">{post.description}</p>
            <p className="post-scheduled-time">{post.scheduledTime}</p>
            <div className="post-actions">
              <button className="post-action-btn" onClick={() => handleLike(post.id)}>Like</button>
              <button className="post-action-btn" onClick={() => handleComment(post.id)}>Comment</button>
              <button className="post-action-btn" onClick={() => handleShare(post.id)}>Share</button>
            </div>
            <div className="post-stats">
              <span className="stat">Likes: {post.like}</span>
              <span className="stat">Comments: {post.comment}</span>
              <span className="stat">Shares: {post.share}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="create-post-container">
        <h2 className="create-post-header">Create New Post</h2>
        <form onSubmit={createPost} className="create-post-form">
        <input type="number" name="id" placeholder="ID" value={newPost.id} onChange={handleChange} className="input" />
          <input type="text" name="title" placeholder="Title" value={newPost.title} onChange={handleChange} className="input" />
          <input type="text" name="description" placeholder="Description" value={newPost.description} onChange={handleChange} className="input" />
          <input type="datetime-local" name="scheduledTime" value={newPost.scheduledTime} onChange={handleChange} className="input" />
          <button type="submit" className="submit-btn">Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
