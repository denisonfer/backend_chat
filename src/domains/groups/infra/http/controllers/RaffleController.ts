import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RealizeRaffleService } from '@domains/groups/services/raffle/RealizeRaffleService';
import { RealizeEventService } from '@domains/groups/services/raffle/RealizeEventService';

export class RaffleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;
    const { id_group } = req.params;

    const realizeRaffleService = container.resolve(RealizeRaffleService);

    await realizeRaffleService.execute(id_user, id_group);

    return res.status(204).send();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id_group } = req.params;

    const realizeEventService = container.resolve(RealizeEventService);

    await realizeEventService.execute(id_group);

    return res.status(204).send();
  }
}
