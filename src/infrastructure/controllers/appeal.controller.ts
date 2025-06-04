import { TimestampHelper } from '@ext/helpers/timestamp.helper.ts';
import { AppealService } from '@/core/application/services/appeal.service.ts';
import { BaseController } from '@/infrastructure/controllers/base.controller.ts';
import { Validator } from '@app/validator/validator.ts';
import type { IAppealsListQuery } from '@/core/application/queries/appeals-list-query.interface.ts';
import type { Request, Response } from 'express';

export class AppealController extends BaseController {
    constructor(
        private readonly _appealService: AppealService,
        private readonly _appealsListQuery: IAppealsListQuery,
    ) {
        super();
    }

    public async getAppealsList(request: Request, response: Response): Promise<void> {
        try {
            const concreteDate = Validator.validate(request.query.concreteDate, 'concreteDate', false)
                .isNumber()?.isTimestamp()?.release() ?? null;

            const startFrom = Validator.validate(request.query.startFrom, 'startFrom', false)
                .isNumber()?.isTimestamp()?.release() ?? null;

            const dueTo = Validator.validate(request.query.dueTo, 'rawDueTo', false)
                .isNumber()?.isTimestamp()?.release() ?? null;

            const limit = Validator.validate(request.query.limit, 'limit', false)
                .isNumber()?.isPositive()?.isInteger()?.release() ?? null;

            const dateRange = concreteDate
                ? TimestampHelper.convertToDayRange(concreteDate)
                : startFrom && dueTo && startFrom >= dueTo
                    ? [TimestampHelper.extractDayStart(startFrom), TimestampHelper.extractDayEnd(dueTo)]
                    : null;

            const appeals = await this._appealsListQuery.execute(dateRange as [number, number], limit, null);

            response.status(this.OK_STATUS_CODE).json(appeals);

        } catch (err: any) {
            this.handleError(err, response);
        }
    }

    public async createAppeal(request: Request, response: Response): Promise<void> {
        try {
            const subject = Validator.validate(request.body?.subject, 'subject')
                .isString()?.isNotEmpty()?.isShorterThen(101)?.release() as string;

            const content = Validator.validate(request.body?.content, 'content')
                .isString()?.isNotEmpty()?.isShorterThen(501)?.release() as string;

            const useCaseResult = await this._appealService.createAppeal(subject, content);

            this.processUseCaseResult(useCaseResult, response, this.CREATED_STATUS_CODE);

        } catch (err: any) {
            this.handleError(err, response);
        }
    }

    public async setAppealOnFlow(request: Request, response: Response): Promise<void> {
        try {
            const id = Validator.validate(request.params.id, 'id')
                .isNumber()?.isInteger()?.isPositive()?.release() as number;

            const useCaseResult = await this._appealService.setAppealOnFlow(id);

            this.processUseCaseResult(useCaseResult, response);

        } catch (err: any) {
            this.handleError(err, response);
        }
    }

    public async processAppeal(request: Request, response: Response): Promise<void> {
        try {
            const id = Validator.validate(request.params.id, 'id')
                .isNumber()?.isInteger()?.isPositive()?.release() as number;

            const solutionGuide = Validator.validate(request.body?.solutionGuide, 'solutionGuide')
                .isString()?.isNotEmpty()?.isShorterThen(501)?.release() as string;

            const useCaseResult = await this._appealService.processAppeal(id, solutionGuide);

            this.processUseCaseResult(useCaseResult, response);

        } catch (err: any) {
            this.handleError(err, response);
        }
    }

    public async cancelAppeal(request: Request, response: Response): Promise<void> {
        try {
            const id = Validator.validate(request.params.id, 'id')
                .isNumber()?.isInteger()?.isPositive()?.release() as number;

            const cancelReason = Validator.validate(request.body?.cancelReason, 'cancelReason')
                .isString()?.isNotEmpty()?.isShorterThen(501)?.release() as string;

            const useCaseResult = await this._appealService.cancelAppeal(id, cancelReason);

            this.processUseCaseResult(useCaseResult, response);

        } catch (err: any) {
            this.handleError(err, response);
        }
    }

    public async cancelAllAppealsOnFlow(request: Request, response: Response): Promise<void> {
        try {
            const cancelReasonTemplate = Validator.validate(request.body?.cancelReasonTemplate, 'cancelReasonTemplate')
                .isString()?.isNotEmpty()?.isShorterThen(501)?.release() as string;

            const useCaseResult = await this._appealService.cancelAllAppealsOnFlow(cancelReasonTemplate);

            this.processUseCaseResult(useCaseResult, response);

        } catch (err: any) {
            this.handleError(err, response);
        }
    }
}
