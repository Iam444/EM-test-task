import { CommonValidationBuilder } from '@app/validator/common-validation.builder.ts';

export class Validator {
    public static validate(sbj: any, propName: string, throwError: boolean = true): CommonValidationBuilder {
        return new CommonValidationBuilder(sbj, propName, throwError);
    }
}
