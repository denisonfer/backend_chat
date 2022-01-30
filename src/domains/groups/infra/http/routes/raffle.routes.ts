import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticatedUser } from '@domains/users/infra/http/middlewares/ensureAuthenticatedUser';
import { RaffleController } from '../controllers/RaffleController';

export const raffleRoutes = Router();
const raffleController = new RaffleController();

raffleRoutes.post(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  raffleController.create,
);

raffleRoutes.patch(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  raffleController.update,
);
