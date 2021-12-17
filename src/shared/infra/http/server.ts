import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import { routes } from '@shared/infra/http/routes';
import { AppError } from '@shared/errors/AppError';
import { isCelebrateError } from 'celebrate';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.WEB_URL
}))
app.use(routes);

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
