import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { faker } from '@faker-js/faker';
import { registerProductRoutes } from './product.mock';
import { registerAuthRoutes } from './auth.mock';
import { registerAccountRoutes } from './account.mock';

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




// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});




// Register product routes
registerProductRoutes(app);

// Register auth routes
registerAuthRoutes(app);

// Register account routes
registerAccountRoutes(app);