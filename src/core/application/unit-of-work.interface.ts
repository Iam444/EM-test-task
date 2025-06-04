import { IEntity } from '@ext/entity/entity.interface.ts';

export interface IUnitOfWork {
    flush(): Promise<void>;

    upsert<T extends IEntity>(entity: T): void;

    delete<T extends IEntity>(entity: T): void;
}
