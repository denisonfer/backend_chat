import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import 'express-async-errors';
import { errors } from 'celebrate';

import swaggerDocs from '@config/swaggerConfig.json';
import '@shared/infra/typeorm';
import '@shared/container';
import { ServerError } from '@shared/error/ServerError';
import { serverRoutes } from './routes';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.json());
app.use(serverRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('[SERVER ERROR ⛔️]:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor',
  });
});

export { httpServer, io };
