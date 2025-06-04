import { autowiringRules, dataSourceOptions, mappingRules } from 'config';
import type { DataSourceOptions } from 'typeorm';
import type { IConstructor } from '@app/constructor.interface.ts';

export class Config {
    public static readonly dataSourceOptions = this._loadDataSourceOptions();
    public static readonly wiringRules       = this._loadAutowiringRules();
    public static readonly mappingRules      = this._loadMappingRules();

    private static _loadDataSourceOptions(): DataSourceOptions {
        return dataSourceOptions;
    }

    private static _loadAutowiringRules(): Map<IConstructor<any>, IConstructor<any>[]> {
        const wiringRulesMap = new Map();

        autowiringRules.forEach(rule => {
            wiringRulesMap.set(rule[0], rule[1]);
        });

        return wiringRulesMap;
    }

    private static _loadMappingRules(): Map<IConstructor<any>, any> {
        const mappingRulesMaps = new Map();

        mappingRules.forEach(rule => {
            mappingRulesMaps.set(rule[0], rule[1]);
        });

        return mappingRulesMaps;
    }
}
