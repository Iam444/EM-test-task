import { Between } from 'typeorm';
import { AppealORM } from '@/infrastructure/orm-models/appeal.orm.ts';
import { DBSource } from '@app/db-source.ts';
import type { IAppealsListQuery } from '@/core/application/queries/appeals-list-query.interface.ts';
import type { IAppeal } from '@/core/application/queries/appeal.interface.ts';

export class AppealsListQuery implements IAppealsListQuery {

    public async execute(dateRange: [number, number] | null, limit: number | null, status: string | null): Promise<IAppeal[]> {
        let where;

        if (dateRange && status) {
            where = { createdAt: Between(dateRange[0], dateRange[1]), status };
        } else if (dateRange) {
            where = { createdAt: Between(dateRange[0], dateRange[1]) };
        } else if (status) {
            where = { status };
        }

        return await DBSource.dbSource
            .getRepository(AppealORM)
            .find({
                where,
                take: limit === null ? 20 : limit,
            })
    }
}
