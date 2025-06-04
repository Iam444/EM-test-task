import { StringValidationBuilder } from '@app/validator/string-validation.builder.ts';
import { NumberValidationBuilder } from '@app/validator/number-validation.builder.ts';
import { InvalidArgumentError } from '@app/invalid-argument.error.ts';

export class CommonValidationBuilder {
    constructor(
        private readonly _sbj: any,
        private readonly _propName: string,
        private readonly _throwError: boolean,
    ) {}

    public isString(): StringValidationBuilder | null {
        if (typeof this._sbj !== 'string') {
            return this._throwOrReturnNull();
        }

        return new StringValidationBuilder(this._sbj, this._propName, this._throwError);
    }

    public isNumber(): NumberValidationBuilder | null {
        if (Number.isNaN(Number(this._sbj))) {
            return this._throwOrReturnNull();
        }

        return new NumberValidationBuilder(this._sbj, this._propName, this._throwError);
    }

    private _throwOrReturnNull(): null {
        if (this._throwError) {
            throw new InvalidArgumentError(`Argument '${ this._propName }' is not valid.`);
        }

        return null;
    }
}
