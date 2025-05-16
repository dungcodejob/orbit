import { Express } from 'express';

const mockAuthData = {
  validCredentials: {
    username: 'testuser',
    password: 'password123',
  },
  tokens: {
    access: 'mock-access-token',
    refresh: 'mock-refresh-token',
  },
};

export function registerAuthRoutes(app: Express) {
  // POST /auth/login
  app.post('/auth/login', (req, res) => {
    console.log('Login attempt:', req.body);
    const { username, password } = req.body;

    if (
      username === mockAuthData.validCredentials.username &&
      password === mockAuthData.validCredentials.password
    ) {
      return res.status(200).json({ tokens: mockAuthData.tokens });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  });

  // POST /auth/logout
  app.post('/auth/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
  });
}