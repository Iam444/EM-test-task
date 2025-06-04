import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseORM {
    @PrimaryGeneratedColumn()
    public id!: number;
}
