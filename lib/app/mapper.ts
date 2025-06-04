import { Config } from '@app/config.ts';
import { InvalidMappingStrategyError } from '@app/invalid-mapping-strategy.error.ts';

export class Mapper {
    public static mapToORM(entity: any): any {
        const MapperClass = Config.mappingRules.get(entity.constructor);

        if (MapperClass === undefined) {
            throw new InvalidMappingStrategyError(`Cant map, provided unknown entity '${ entity.constructor.name }'. Add records to config.`);
        }

        try {
            return MapperClass.mapToORM(entity);

        } catch (err) {
            throw new InvalidMappingStrategyError(`Error in mapping '${ entity.constructor.name }' to ORM. See '${ MapperClass.name }'.`);
        }
    }
}
