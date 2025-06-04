import { Appeal } from '@/core/domain/appeal/appeal.ts';
import { EAppealStatuses } from '@/core/domain/appeal/appeal-statuses.enum.ts';
import { Title } from '@/core/domain/value-objects/title.ts';
import { Text } from '@/core/domain/value-objects/text.ts';
import type { IAppealQuery } from '@/core/application/queries/appeal-query.interface.ts';
import type { IUnitOfWork } from '@/core/application/unit-of-work.interface.ts';
import type { IAppealsListQuery } from '@/core/application/queries/appeals-list-query.interface.ts';

export class AppealRepository {
    constructor(
        private readonly _unitOfWork: IUnitOfWork,
        private readonly _appealQuery: IAppealQuery,
        private readonly _appealsListQuery: IAppealsListQuery,
    ) {}

    public async find(entityID: number): Promise<Appeal> {
        const appealDTO = await this._appealQuery.execute(entityID);

        return new Appeal(
            appealDTO.id,
            new Title(appealDTO.subject),
            new Text(appealDTO.content),
            new Date(appealDTO.createdAt * 1000),
            appealDTO.status as EAppealStatuses,
            appealDTO.replyContent === null ? null : new Text(appealDTO.replyContent),
        );
    }

    public async findByStatus(status: EAppealStatuses): Promise<Appeal[]> {
        const appealDTOs = await this._appealsListQuery.execute(null, null, status)

        return appealDTOs.map(appealDTO => new Appeal(
            appealDTO.id,
            new Title(appealDTO.subject),
            new Text(appealDTO.content),
            new Date(appealDTO.createdAt * 1000),
            appealDTO.status as EAppealStatuses,
            appealDTO.replyContent === null ? null : new Text(appealDTO.replyContent),
        ));
    }

    public async add(entities: Appeal | Appeal[]): Promise<void> {
        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        entities.forEach(entity => this._unitOfWork.upsert(entity));
    }

    public async remove(entity: Appeal): Promise<void> {
        this._unitOfWork.delete(entity);
    }
}