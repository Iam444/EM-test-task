import { AppFactory } from '@app/app-factory.ts';

async function bootstrap(): Promise<void> {
    const app = await AppFactory.create();
    const port = process.env.PORT ?? 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${ port }`);
    });
}

bootstrap();
