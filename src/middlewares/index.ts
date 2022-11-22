import { Application } from 'express';
import routesMiddleware from './routes';
import errorMiddleware from './error';
import notFoundMiddleware from './notFound';
import bodyParser from 'body-parser';

export default (app: Application): void => {
    app.use(bodyParser.json());
    app.use(routesMiddleware);
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);
};