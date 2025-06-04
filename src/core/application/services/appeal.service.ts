import { Result } from '@ext/entity/result.ts';
import { Appeal } from '@/core/domain/appeal/appeal.ts';
import { Title } from '@/core/domain/value-objects/title.ts';
import { Text } from '@/core/domain/value-objects/text.ts';
import { EAppealStatuses } from '@/core/domain/appeal/appeal-statuses.enum.ts';
import { AppealRepository } from '@/core/application/repositories/appeal.repository.ts';
import type { IUnitOfWork } from '@/core/application/unit-of-work.interface.ts';

export class AppealService {
    constructor(
        private readonly _appealRepository: AppealRepository,
        private readonly _unitOfWork: IUnitOfWork,
    ) {}

    public async createAppeal(subject: string, content: string): Promise<Result> {
        const appeal = Appeal.create(
            new Title(subject),
            new Text(content),
        )

        await this._appealRepository.add(appeal);
        await this._unitOfWork.flush();

        return Result.getSuccessfulResult('Appeal created successfully');
    }

    public async setAppealOnFlow(appealID: number): Promise<Result> {
        const appeal = await this._appealRepository.find(appealID);

        const result = appeal.setOnFlow();

        if (result.success) {
            await this._appealRepository.add(appeal);
            await this._unitOfWork.flush();
        }

        return result;
    }


    public async processAppeal(appealID: number, solutionGuide: string): Promise<Result> {
        const appeal = await this._appealRepository.find(appealID);

        const result = appeal.process(new Text(solutionGuide));

        if (result.success) {
            await this._appealRepository.add(appeal);
            await this._unitOfWork.flush();
        }

        return result;
    }

    public async cancelAppeal(appealID: number, cancelReason: string): Promise<Result> {
        const appeal = await this._appealRepository.find(appealID);

        const result = appeal.cancel(new Text(cancelReason));

        if (result.success) {
            await this._appealRepository.add(appeal);
            await this._unitOfWork.flush();
        }

        return result;
    }

    public async cancelAllAppealsOnFlow(cancelReasonTemplate: string): Promise<Result> {
        const appealsOnFlow = await this._appealRepository.findByStatus(EAppealStatuses.ON_FLOW);

        const cancelReason = new Text(cancelReasonTemplate);

        for (const appeal of appealsOnFlow) {
            const result = appeal.cancel(cancelReason);

            if (!result.success) {
                return Result.getNotSuccessfulResult(`Appeal with ID (${ appeal.id }) can't be canceled. ${ result.message }`)
            }
        }

        await this._appealRepository.add(appealsOnFlow);
        await this._unitOfWork.flush();

        return Result.getSuccessfulResult('All appeals on flow has been canceled');
    }
}
