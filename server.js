
// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create an instance of Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Mock data for posts (replace this with your database implementation)
let posts = [];

// Mock data for users (replace this with your database implementation)
let users = [];

// Route to fetch posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Route to create a new post
app.post('/api/posts', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});
app.get('/api/log',(req,res)=>{
  res.send(users);
})
app.get('/api/sign',(req,res)=>{
  res.send(users);
})
// Route for user signup
app.post('/api/sign', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for user login
app.post('/api/log', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    // Compare passwords
    if (await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, 'secret_key');
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
