import { IAppeal } from '@/core/application/queries/appeal.interface.ts';

export interface IAppealQuery {
    execute(id: number): Promise<IAppeal>,
}
