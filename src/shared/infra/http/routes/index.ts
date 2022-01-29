import { Router } from 'express';

import { userRoutes } from '@domains/users/infra/http/routes/user.routes';
import { sessionRoutes } from '@domains/users/infra/http/routes/session.routes';
import { passwordRoutes } from '@domains/users/infra/http/routes/password.routes';
import { groupRoutes } from '@domains/groups/infra/http/routes/group.routes';
import { giftsRoutes } from '@domains/users/infra/http/routes/gift.routes';
import { userGroupRoutes } from '@domains/groups/infra/http/routes/userGroup.routes';
import { raffleRoutes } from '@domains/groups/infra/http/routes/raffle.routes';

const serverRoutes = Router();

serverRoutes.use('/users', userRoutes);
serverRoutes.use('/sessions', sessionRoutes);
serverRoutes.use('/passwords', passwordRoutes);
serverRoutes.use('/groups', groupRoutes);
serverRoutes.use('/gifts', giftsRoutes);
serverRoutes.use('/users/groups', userGroupRoutes);
serverRoutes.use('/raffles', raffleRoutes);

export { serverRoutes };
