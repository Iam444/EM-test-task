import express from 'express';
import dotenv from 'dotenv';
import { DBSource } from '@app/db-source.ts';
import { Router } from '@app/router.ts';
import type { Express } from 'express';

export class AppFactory {
    public static async create(): Promise<Express> {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }))
        app.use(Router.router);

        await DBSource.initialize()
            .then(() => {
                console.log('DATA SOURCE has been initialized');
            })
            .catch((err) => {
                console.error('Error during Data Source initialization', err);
            });

        await Router.initialize()
            .then(() => {
                console.log('All ROUTES has been initialized');
            })
            .catch((err) => {
                console.error('Error during routes initialization', err);
            });

        dotenv.config();

        return app;
    }
}
