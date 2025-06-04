import { Config } from '@app/config.ts';
import type { IConstructor } from '@app/constructor.interface.ts';

export class Autowirer {
    public static _singletonInstances = new Map();

    public static wire<T>(Class: IConstructor<T>): T {

        if (this._singletonInstances.has(Class)) {
            return this._singletonInstances.get(Class);
        }

        const dependencies = Config.wiringRules.get(Class);

        let args: unknown[] = [];

        if (dependencies !== undefined) {
            dependencies.forEach((dependency) => {
                args.push(this.wire(dependency));
            })
        }

        const instance = new Class(...args);

        this._singletonInstances.set(Class, instance);

        return instance;
    }
}
