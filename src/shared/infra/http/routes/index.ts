import { Router } from 'express';

import { userRoutes } from '@domains/users/infra/http/routes/user.routes';
import { sessionRoutes } from '@domains/users/infra/http/routes/session.routes';
import { passwordRoutes } from '@domains/users/infra/http/routes/password.routes';
import { groupRoutes } from '@domains/groups/infra/http/routes/group.routes';
import { giftsRoutes } from '@domains/users/infra/http/routes/gift.routes';

const serverRoutes = Router();

serverRoutes.use('/users', userRoutes);
serverRoutes.use('/sessions', sessionRoutes);
serverRoutes.use('/passwords', passwordRoutes);
serverRoutes.use('/groups', groupRoutes);
serverRoutes.use('/gifts', giftsRoutes);

export { serverRoutes };
