import { Result } from '@ext/entity/result.ts';
import { EAppealStatuses } from '@/core/domain/appeal/appeal-statuses.enum.ts';
import { Title } from '@/core/domain/value-objects/title.ts';
import { Text } from '@/core/domain/value-objects/text.ts';
import type { IEntity } from '@ext/entity/entity.interface.ts';

export class Appeal implements IEntity {
    constructor(
        private readonly _id: number | null,
        private readonly _subject: Title,
        private readonly _content: Text,
        private readonly _createdAt: Date,
        private _status: EAppealStatuses,
        private _replyContent: Text | null,
    ) {}

    get id(): number | null {
        return this._id;
    }

    get subject(): Title {
        return this._subject;
    }

    get content(): Text {
        return this._content;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get status(): EAppealStatuses {
        return this._status;
    }

    get replyContent(): Text | null {
        return this._replyContent;
    }

    public static create(subject: Title, content: Text): Appeal {
        return new Appeal(null, subject, content, new Date(), EAppealStatuses.NEW, null);
    }

    public setOnFlow(): Result {
        if (!this._isConversionableTo(EAppealStatuses.ON_FLOW)) {
            return new Result(
                false,
                `Can't make conversion to status "${ EAppealStatuses.ON_FLOW }"`,
            );
        }

        this._status = EAppealStatuses.ON_FLOW;

        return new Result(true, `Appeal has been set on flow`);
    }

    public process(solutionGuide: Text): Result {
        if (!this._isConversionableTo(EAppealStatuses.PROCESSED)) {
            return new Result(
                false,
                `Can't make conversion to status "${ EAppealStatuses.PROCESSED }"`,
            );
        }

        this._replyContent = solutionGuide;
        this._status       = EAppealStatuses.PROCESSED;

        return new Result(true, `Appeal has been processed`);
    }

    public cancel(cancelReason: Text): Result {
        if (!this._isConversionableTo(EAppealStatuses.CANCELED)) {
            return new Result(
                false,
                `Can't make conversion to status "${ EAppealStatuses.CANCELED }"`,
            );
        }

        this._replyContent = cancelReason;
        this._status       = EAppealStatuses.CANCELED;

        return new Result(true, `Appeal has been canceled`);
    }

    private _isConversionableTo(targetStatus: EAppealStatuses): boolean {
        const availableConversions = Appeal._statusConversionsRules.get(this._status) as EAppealStatuses[];

        return availableConversions.includes(targetStatus);
    }

    private static _statusConversionsRules = ((): Map<EAppealStatuses, EAppealStatuses[]> => {
        const rules = new Map();

        rules.set(EAppealStatuses.NEW, [EAppealStatuses.ON_FLOW]);
        rules.set(EAppealStatuses.ON_FLOW, [EAppealStatuses.PROCESSED, EAppealStatuses.CANCELED]);
        rules.set(EAppealStatuses.PROCESSED, []);
        rules.set(EAppealStatuses.CANCELED, []);

        return rules;
    })();
}
