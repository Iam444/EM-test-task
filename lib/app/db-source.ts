import { DataSource } from 'typeorm';
import { Config } from '@app/config.ts';

export class DBSource {
    private static _dbSource: DataSource;

    static get dbSource() {
        return this._dbSource;
    }

    public static async initialize(): Promise<void> {
        this._dbSource = new DataSource(Config.dataSourceOptions);

        await this.dbSource.initialize();
    }
}
