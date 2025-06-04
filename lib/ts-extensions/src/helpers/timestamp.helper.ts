export class TimestampHelper {
    private static readonly DAY_TO_SECONDS = 86400;
    private static readonly HOUR_TO_SECONDS = 3600;
    private static readonly MINUTE_TO_SECONDS = 60;

    public static extractDayStart(timestamp: number): number {
        return timestamp - timestamp % this.DAY_TO_SECONDS;
    }

    public static extractDayEnd(timestamp: number): number {
        return this.extractDayStart(timestamp) + this.DAY_TO_SECONDS - 1;
    }

    public static convertToDayRange(timestamp: number): [number, number] {
        return [this.extractDayStart(timestamp), this.extractDayEnd(timestamp)];
    }
}
