import { ensureAuthenticatedUser } from '@domains/users/infra/http/middlewares/ensureAuthenticatedUser';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';

export const groupRoutes = Router();
const groupController = new GroupController();

groupRoutes.get('/', ensureAuthenticatedUser, groupController.index);
groupRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      date_raffle: Joi.date().required(),
      date_party: Joi.date().required(),
      hour_party: Joi.date().required(),
      locale_party: Joi.string().required(),
      value_min: Joi.number().required(),
    },
  }),
  ensureAuthenticatedUser,
  groupController.create,
);
