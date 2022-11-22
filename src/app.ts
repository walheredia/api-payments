import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config()
const app = express();
import applyMiddlewares from './middlewares';

// Middlewares
applyMiddlewares(app);

export default app;
