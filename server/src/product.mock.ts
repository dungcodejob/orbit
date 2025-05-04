import { faker } from '@faker-js/faker';
import { Express } from 'express';

// Generate mock product data
let mockProducts = Array.from({ length: 30 }).map((_, i) => ({
  id: (i + 1).toString(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: Number(faker.commerce.price({ min: 10, max: 1000 })),
  imageUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
}));

export function registerProductRoutes(app: Express) {
  // GET /api/products - load all products, support keyword search and pagination
  app.get('/products', (req, res) => {
    const { keyword, currentPage = 1, pageSize = 10 } = req.query;

    let filtered = mockProducts;

    // Search filter
    if (keyword && typeof keyword === 'string') {
      const lowerKeyword = keyword.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerKeyword) ||
          p.description.toLowerCase().includes(lowerKeyword)
      );
    }

    // Pagination
    const page = Number(currentPage) || 1;
    const size = Number(pageSize) || 10;
    const total = filtered.length;
    const start = (page - 1) * size;
    const end = start + size;
    const items = filtered.slice(start, end);

    res.json({
      items,
      total,
      currentPage: page,
      pageSize: size,
    });
  });

  // GET /api/products/:id - load single product
  app.get('/products/:id', (req, res) => {
    const product = mockProducts.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  // PUT /api/products/:id - update product
  app.put('/products/:id', (req, res) => {
    const index = mockProducts.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    mockProducts[index] = {
      ...mockProducts[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString(),
    };
    res.json(mockProducts[index]);
  });

  // DELETE /api/products/:id - delete product
  app.delete('/products/:id', (req, res) => {
    const index = mockProducts.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const deleted = mockProducts.splice(index, 1);
    res.json(deleted[0]);
  });
}