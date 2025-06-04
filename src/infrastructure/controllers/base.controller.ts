import { Result } from '@ext/entity/result.ts';
import { UnsuccessfulUseCaseError } from '@/infrastructure/errors/unsuccessful-use-case.error.ts';
import { RecordNotExistsError } from '@/infrastructure/errors/record-not-exists.error.ts';
import { InvalidArgumentError } from '@app/invalid-argument.error.ts';
import type { Response } from 'express';

export abstract class BaseController {
    public readonly OK_STATUS_CODE             = 200;
    public readonly CREATED_STATUS_CODE        = 201;
    public readonly BAD_REQUEST_STATUS_CODE    = 400;
    public readonly INTERNAL_ERROR_STATUS_CODE = 500;

    public processUseCaseResult(
        useCaseResult: Result,
        response: Response,
        statusCode: number = this.OK_STATUS_CODE
    ): void {

        if (!useCaseResult.success) {
            throw new UnsuccessfulUseCaseError(useCaseResult.message);
        }

        response.status(statusCode).json({
            status: statusCode,
            message: useCaseResult.message
        });
    }

    public handleError<T extends Error>(err: T, response: Response): void {
        if (
            err instanceof InvalidArgumentError ||
            err instanceof RecordNotExistsError
        ) {
            response.status(this.BAD_REQUEST_STATUS_CODE)
                .json({
                    title: 'Wrong arguments provided.',
                    status: this.BAD_REQUEST_STATUS_CODE,
                    message: err.message,
                });

            return;
        }

        if (err instanceof UnsuccessfulUseCaseError) {
            response.status(this.BAD_REQUEST_STATUS_CODE)
                .json({
                    title: 'Invalid action.',
                    status: this.BAD_REQUEST_STATUS_CODE,
                    message: err.message,
                });

            return;
        }

        console.error(err);

        response.status(this.INTERNAL_ERROR_STATUS_CODE)
            .json({
                title: 'Internal server error',
                status: this.INTERNAL_ERROR_STATUS_CODE,
                message: 'Server is temporary unavailable.',
            })
    }
}
