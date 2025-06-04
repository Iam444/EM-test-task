import { Router } from '@app/router.ts';
import { AppealController } from '@/infrastructure/controllers/appeal.controller.ts';

Router.get('/appeals', AppealController, 'getAppealsList');
Router.post('/appeals/create', AppealController, 'createAppeal');
Router.patch('/appeals/cancel-all-on-flow', AppealController, 'cancelAllAppealsOnFlow');
Router.patch('/appeals/:id/set-on-flow', AppealController, 'setAppealOnFlow');
Router.patch('/appeals/:id/process', AppealController, 'processAppeal');
Router.patch('/appeals/:id/cancel', AppealController, 'cancelAppeal');
