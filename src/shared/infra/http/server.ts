import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { routes } from '@shared/infra/http/routes';
import { AppError } from '@shared/errors/AppError';
import { isCelebrateError } from 'celebrate';
import uploadConfig from '@config/upload';
import cors from 'cors';
import { rateLimiter } from '@shared/infra/http/middlewares/rateLimiter';
import swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from '@shared/infra/swagger/swagger.json';

const url =
    process.env.NODE_ENV === 'dev'
        ? process.env.WEB_DEV_URL
        : process.env.WEB_PROD_URL;

const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(rateLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(
    cors({
        origin: url,
    }),
);
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
    if (error instanceof AppError) {
        const { statusCode } = error;

        return response.status(statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    if (isCelebrateError(error)) {
        const values = error.details.values();
        let { message } = values.next().value.details[0];
        message = message.replace('"', '').replace('"', '');

        return response.status(400).json({
            status: 'error',
            type: 'validation',
            message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: error.message,
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log('Server started');
});
