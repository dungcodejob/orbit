import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 4200;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Update this to match your client's URL
  credentials: true,
}));
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mock data
const mockData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ],
  posts: [
    { id: 1, title: 'First Post', content: 'This is the first post' },
    { id: 2, title: 'Second Post', content: 'This is the second post' },
  ],
  auth: {
    validCredentials: {
      username: 'testuser',
      password: 'password123',
    },
    tokens: {
      access: 'mock-access-token',
      refresh: 'mock-refresh-token',
    },
  },
};

// Auth endpoints
app.post('/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { username, password } = req.body;

  if (
    username === mockData.auth.validCredentials.username &&
    password === mockData.auth.validCredentials.password
  ) {
    return res.status(200).json({ tokens: mockData.auth.tokens });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/auth/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Users endpoints
app.get('/api/users', (req, res) => {
  res.json(mockData.users);
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = mockData.users.find((u) => u.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: mockData.users.length + 1,
    ...req.body,
  };
  
  mockData.users.push(newUser);
  res.status(201).json(newUser);
});

// Posts endpoints
app.get('/api/posts', (req, res) => {
  res.json(mockData.posts);
});

app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = mockData.posts.find((p) => p.id === id);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const newPost = {
    id: mockData.posts.length + 1,
    ...req.body,
  };
  
  mockData.posts.push(newPost);
  res.status(201).json(newPost);
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
}); 