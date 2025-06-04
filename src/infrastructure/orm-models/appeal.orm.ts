import { Entity, Column } from 'typeorm';
import { BaseORM } from '@/infrastructure/orm-models/base-orm.ts';

@Entity({ name: 'appeals' })
export class AppealORM extends BaseORM {

    @Column()
    public subject!: string;

    @Column()
    public content!: string;

    @Column()
    public status!: string;

    @Column({ type: 'text', nullable: true })
    public replyContent!: string | null;

    @Column()
    public createdAt!: number;
}
