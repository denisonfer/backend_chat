import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { UserController } from '../controllers/UserController';
import { AvatarController } from '../controllers/AvatarController';
import { ensureAuthenticatedUser } from '../middlewares/ensureAuthenticatedUser';

const userRoutes = Router();
const userController = new UserController();
const avatarController = new AvatarController();
const upload = multer(uploadConfig.multer);

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      device_id: Joi.string().required(),
    },
  }),
  userController.create,
);

userRoutes.patch(
  '/avatar/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().required(),
    },
  }),
  upload.single('avatar'),
  avatarController.update,
);

userRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
    },
  }),
  ensureAuthenticatedUser,
  userController.update,
);

export { userRoutes };
