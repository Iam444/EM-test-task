import { ValueObject } from '@ext/value-object/value-object.ts';

export class Title extends ValueObject<string> {
    private static LENGTH_LIMIT: number = 100;

    protected _throwValidationError(value: string): void {
        throw new Error(
            `Title must be a non empty string in range of ${Title.LENGTH_LIMIT} chars. ${value.length} chars given.`,
        );
    }

    protected _isValid(value: string): boolean {
        return value.length > 0 && value.length < Title.LENGTH_LIMIT;
    }
}
