import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticatedUser } from '@domains/users/infra/http/middlewares/ensureAuthenticatedUser';
import { UserGroupController } from '../controllers/UserGroupController';

export const userGroupRoutes = Router();
const userGroupController = new UserGroupController();

userGroupRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code_invite: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  userGroupController.create,
);
