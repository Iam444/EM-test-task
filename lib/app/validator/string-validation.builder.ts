import { InvalidArgumentError } from '@app/invalid-argument.error.ts';

export class StringValidationBuilder {
    constructor(
        private readonly _sbj: string,
        private readonly _propName: string,
        private readonly _throwError: boolean,
    ) {}

    public release(): string {
        return this._sbj;
    }

    public isShorterThen(length: number): StringValidationBuilder | null {
        return this._check(this._sbj.length < length);
    }

    public isLongerThen(length: number): StringValidationBuilder | null {
        return this._check(this._sbj.length > length);
    }

    public hasLength(length: number): StringValidationBuilder | null {
        return this._check(this._sbj.length === length);
    }

    public isEmpty(): StringValidationBuilder | null {
        return this._check(this._sbj.length === 0);
    }

    public isNotEmpty(): StringValidationBuilder | null {
        return this._check(this._sbj.length !== 0);
    }

    private _check(condition: boolean): StringValidationBuilder | null {
        if (!condition) {
            if (this._throwError) {
                throw new InvalidArgumentError(`Argument '${ this._propName }' is not valid.`);
            }

            return null;
        }

        return this;
    }
}
