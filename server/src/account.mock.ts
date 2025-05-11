import { Express } from 'express';

let mockAccount = {
  id: '1',
  username: 'mockuser',
  email: 'mockuser@example.com',
  fullName: 'Mock User',
  phone: '123456789',
  address: '123 Mock St',
  city: null,
  district: null,
  registerDate: new Date().toISOString(),
  langcode: 'en',
  available: 1,
  avatar: null,
  portrait_img: null,
  updatedAt: new Date().toISOString(),
  updatedBy: 'system',
  createdBy: 'system',
  createdAt: new Date().toISOString(),
};

export function registerAccountRoutes(app: Express) {
  // GET /account
  app.get('/account', (req, res) => {
    res.json(mockAccount);
  });

  // PUT /account/:id
  app.put('/account/:id', (req, res) => {
    const { id } = req.params;
    // Update mockAccount with provided fields
    mockAccount = { ...mockAccount, ...req.body, id };
    res.json(mockAccount);
  });
}