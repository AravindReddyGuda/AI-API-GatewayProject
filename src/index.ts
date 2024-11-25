import express, { Express } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/api', routes);

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 