import { AppealORM } from '@/infrastructure/orm-models/appeal.orm.ts';
import { RecordNotExistsError } from '@/infrastructure/errors/record-not-exists.error.ts';
import { DBSource } from '@app/db-source.ts';
import type { IAppeal } from '@/core/application/queries/appeal.interface.ts';
import type { IAppealQuery } from '@/core/application/queries/appeal-query.interface.ts';

export class AppealQuery implements IAppealQuery {

    public async execute(id: number): Promise<IAppeal> {
        const appeal = await DBSource.dbSource
            .getRepository(AppealORM)
            .findOneBy({ id });

        if (appeal === null) {
            throw new RecordNotExistsError(`Record with provided ID (${ id }) not exists.`);
        }

        return appeal;
    }
}
