import { IAppeal } from '@/core/application/queries/appeal.interface.ts';

export interface IAppealsListQuery {
    execute(dateRange: [number, number] | null, limit: number | null, status: string | null): Promise<IAppeal[]>,
}
