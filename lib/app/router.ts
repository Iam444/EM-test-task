import express, { Router as ExpressRouter } from 'express';
import { Autowirer } from '@app/autowirer.ts';
import type { Request, Response } from 'express';
import type { IConstructor } from '@app/constructor.interface.ts';
import { InvalidControllersInitializationError } from '@app/invalid-controllers-initialization.error.ts';

export class Router {
    public static readonly router: ExpressRouter = express.Router();

    public static async initialize(): Promise<void> {
        await import('routes');
    }

    public static get<TController>(
        url: string,
        ControllerClass: IConstructor<TController>,
        methodName: keyof TController & string,
    ): void {
        this.router.get(url, this._getHandler(ControllerClass, methodName));
    }

    public static post<TController>(
        url: string,
        ControllerClass: IConstructor<TController>,
        methodName: keyof TController & string,
    ): void {
        this.router.post(url, this._getHandler(ControllerClass, methodName));
    }

    public static patch<TController>(
        url: string,
        ControllerClass: IConstructor<TController>,
        methodName: keyof TController & string,
    ): void {
        this.router.patch(url, this._getHandler(ControllerClass, methodName));
    }

    private static _getHandler<TController>(
        ControllerClass: IConstructor<TController>,
        methodName: keyof TController & string,
    ) {
        const availableMethods = Object
            .getOwnPropertyNames(ControllerClass.prototype)
            .filter(prop => prop !== 'constructor')

        if (!availableMethods.includes(methodName)) {
            throw new InvalidControllersInitializationError(`Controller ${ ControllerClass.name } don't have a method '${ methodName }'`);
        }

        const controller = Autowirer.wire(ControllerClass);

        const handler = controller[methodName] as (req: Request, res: Response) => void;

        return handler.bind(controller);
    }
}
