import { Appeal } from '@/core/domain/appeal/appeal.ts';
import { AppealORM } from '@/infrastructure/orm-models/appeal.orm.ts';

export class AppealMapper {
    public static mapToORM(appeal: Appeal): AppealORM {
        const appealORM = new AppealORM();

        if (appeal.id !== null) {
            appealORM.id = appeal.id;
        }

        appealORM.subject      = appeal.subject.value;
        appealORM.content      = appeal.content.value;
        appealORM.createdAt    = Math.trunc(appeal.createdAt.getTime() / 1000);
        appealORM.status       = appeal.status;
        appealORM.replyContent = appeal.replyContent?.value ?? null;

        return appealORM;
    }
}