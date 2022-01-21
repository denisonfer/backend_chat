import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { GiftController } from '../controllers/GiftController';
import { ensureAuthenticatedUser } from '../middlewares/ensureAuthenticatedUser';

export const giftsRoutes = Router();
const giftsController = new GiftController();

giftsRoutes.get('/', ensureAuthenticatedUser, giftsController.show);

giftsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      gift_1: Joi.string().required(),
      gift_2: Joi.string().required(),
      gift_3: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  giftsController.create,
);

giftsRoutes.put(
  '/:id_gift',
  celebrate({
    [Segments.PARAMS]: {
      id_gift: Joi.string().required(),
    },
    [Segments.BODY]: {
      gift_1: Joi.string(),
      gift_2: Joi.string(),
      gift_3: Joi.string(),
    },
  }),
  ensureAuthenticatedUser,
  giftsController.update,
);
