export interface IConstructor<TReturn = void, TArgs = any> {
    new (...args: TArgs[]): TReturn;
}
