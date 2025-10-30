// ...existing code...
import express from 'express';
// ...existing code...
// import { json, urlencoded } from 'body-parser';
import { createConnection } from './utils/db';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

// Middleware
// app.use(json());
// app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
createConnection();

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

export default app;
// ...existing code...