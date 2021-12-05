import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export { sessionRoutes };
