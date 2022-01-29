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

groupRoutes.put(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      date_raffle: Joi.date(),
      date_party: Joi.date(),
      hour_party: Joi.date(),
      locale_party: Joi.string(),
      value_min: Joi.number(),
    },
  }),
  ensureAuthenticatedUser,
  groupController.update,
);
