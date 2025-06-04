import { InvalidArgumentError } from '@app/invalid-argument.error.ts';

export class NumberValidationBuilder {
    constructor(
        private readonly _sbj: number,
        private readonly _propName: string,
        private readonly _throwError: boolean,
    ) {}

    public release(): number {
        return this._sbj;
    }

    public isPositive(): NumberValidationBuilder | null {
        return this._check(this._sbj > 0);
    }

    public isNegative(): NumberValidationBuilder | null {
        return this._check(this._sbj < 0);
    }

    public isNonPositive(): NumberValidationBuilder | null {
        return this._check(this._sbj <= 0);
    }

    public isNonNegative(): NumberValidationBuilder | null {
        return this._check(this._sbj >= 0);
    }

    public isZero(): NumberValidationBuilder | null {
        return this._check(this._sbj === 0);
    }

    public isInteger(): NumberValidationBuilder | null {
        return this._check(Number.isInteger(this._sbj));
    }

    public isLessThen(comparator: number): NumberValidationBuilder | null {
        return this._check(this._sbj < comparator);
    }

    public isLessOrEquals(comparator: number): NumberValidationBuilder | null {
        return this._check(this._sbj <= comparator);
    }

    public isMoreThen(comparator: number): NumberValidationBuilder | null {
        return this._check(this._sbj > comparator);
    }

    public isMoreOrEquals(comparator: number): NumberValidationBuilder | null {
        return this._check(this._sbj > comparator);
    }

    public isTimestamp(): NumberValidationBuilder | null {
        return this._check(this.isNonNegative() !== null && this.isInteger() !== null);
    }

    private _check(condition: boolean): NumberValidationBuilder | null {
        if (!condition) {
            if (this._throwError) {
                throw new InvalidArgumentError(`Argument '${ this._propName }' is not valid.`);
            }

            return null;
        }

        return this;
    }
}
