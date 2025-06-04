import { InvalidValueObjectError } from '@ext/value-object/invalid-value-object.error.ts';
import type { TScalar } from '@ext/scalar.type.ts';

export abstract class ValueObject<TValue extends TScalar> {
    protected readonly _value: TValue;

    constructor(value: TValue) {
        this.validate(value);
        this._value = value;
    }

    get value(): TValue {
        return this._value;
    }

    protected abstract _isValid(value: TValue): boolean;

    public equals<T extends ValueObject<TValue>>(valueObject: T): boolean {
        return this.constructor === valueObject.constructor && this.value === valueObject.value;
    }

    protected _throwValidationError(value: TValue): void {
        throw new InvalidValueObjectError(`Invalid value of value object: ${value}`);
    }

    private validate(value: TValue): void {
        if (!this._isValid(value)) {
            this._throwValidationError(value);
        }
    }
}
