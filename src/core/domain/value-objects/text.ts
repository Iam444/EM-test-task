import { ValueObject } from '@ext/value-object/value-object.ts';

export class Text extends ValueObject<string> {
    private static LENGTH_LIMIT: number = 500;

    protected _throwValidationError(value: string): void {
        throw new Error(
            `Text must be a non empty string in range of ${Text.LENGTH_LIMIT} chars. ${value.length} chars given.`,
        );
    }

    protected _isValid(value: string): boolean {
        return value.length > 0 && value.length < Text.LENGTH_LIMIT;
    }
}
