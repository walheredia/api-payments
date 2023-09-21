import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config()
const app = express();
app.use(cors())
import applyMiddlewares from './middlewares';

// Middlewares
applyMiddlewares(app);

export default app;
