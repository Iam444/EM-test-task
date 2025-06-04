import { DataSourceOptions } from 'typeorm';
import { Appeal } from '@/core/domain/appeal/appeal.ts';
import { AppealService } from '@/core/application/services/appeal.service.ts';
import { AppealRepository } from '@/core/application/repositories/appeal.repository.ts';
import { AppealController } from '@/infrastructure/controllers/appeal.controller.ts';
import { AppealMapper } from '@/infrastructure/mappers/appeal.mapper.ts';
import { UnitOfWork } from '@/infrastructure/persistence/unit-of-work.ts';
import { AppealsListQuery } from '@/infrastructure/queries/typeorm/appeals-list.query.ts';
import { AppealQuery } from '@/infrastructure/queries/typeorm/appeal.query.ts';

export const autowiringRules = [
    [
        AppealController,
        [AppealService, AppealsListQuery],
    ],
    [
        AppealService,
        [AppealRepository, UnitOfWork],
    ],
    [
        AppealRepository,
        [UnitOfWork, AppealQuery, AppealsListQuery],
    ],
];

export const mappingRules = [
    [Appeal, AppealMapper],
]

export const dataSourceOptions: DataSourceOptions = {
    type: "sqlite",
    database: "data/database.sqlite",
    entities: ["src/infrastructure/orm-models/*.orm.ts"],
    synchronize: true,
};
