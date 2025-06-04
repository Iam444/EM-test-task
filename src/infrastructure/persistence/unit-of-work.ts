import { QueryRunner } from 'typeorm';
import { InvalidTransactionError } from '@/infrastructure/errors/invalid-transaction.error.ts';
import { DBSource } from '@app/db-source.ts';
import { Mapper } from '@app/mapper.ts';
import type { IEntity } from '@ext/entity/entity.interface.ts';
import type { IUnitOfWork } from '@/core/application/unit-of-work.interface.ts';

export class UnitOfWork implements IUnitOfWork {
    constructor(
        private readonly queryRunner: QueryRunner = DBSource.dbSource.createQueryRunner(),
    ) {}

    private _operations: (() => Promise<void>)[] = [];

    public upsert<T extends IEntity>(entity: T): void {
        const orm = Mapper.mapToORM(entity);

        const upsertOperation = async () => {
            await this.queryRunner.manager.save(orm);
        }

        this._operations.push(upsertOperation);
    }

    public delete<T extends IEntity>(entity: T): void {
        const orm = Mapper.mapToORM(entity);

        const deleteOperation = async () => {
            await this.queryRunner.manager.save(orm);
        }

        this._operations.push(deleteOperation);
    }
    
    public async flush(): Promise<void> {
        try {
            await this.queryRunner.startTransaction();

            for (const operation of this._operations) {
                await operation();
            }

            await this.queryRunner.commitTransaction();

        } catch (error) {
            await this.queryRunner.rollbackTransaction();

            throw new InvalidTransactionError();

        } finally {
            await this.queryRunner.release();

            this._operations = [];
        }
    }
}
