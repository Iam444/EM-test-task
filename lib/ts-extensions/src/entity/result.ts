export class Result {
    constructor(
        public readonly success: boolean,
        public readonly message: string,
    ) {}

    public static getSuccessfulResult(message: string): Result {
        return new Result(true, message);
    }

    public static getNotSuccessfulResult(message: string): Result {
        return new Result(false, message);
    }
}
