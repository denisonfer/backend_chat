import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGiftsService } from '@domains/users/services/gift/CreateGiftsService';
import { ShowGiftsOfUserService } from '@domains/users/services/gift/ShowGiftsOfUserService';
import { EditGiftsService } from '@domains/users/services/gift/EditGiftsService';

export class GiftController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showGiftsOfUser = container.resolve(ShowGiftsOfUserService);

    const gifts = await showGiftsOfUser.execute(id);

    return res.json(gifts);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { gift_1, gift_2, gift_3 } = req.body;

    const createGifts = container.resolve(CreateGiftsService);

    const gifts = await createGifts.execute({
      id_user: id,
      gift_1,
      gift_2,
      gift_3,
    });

    return res.json(gifts);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { gift_1, gift_2, gift_3 } = req.body;
    const { id_gift } = req.params;

    const editGift = container.resolve(EditGiftsService);

    const giftsEdited = await editGift.execute({
      id_user: id,
      id_gift,
      gift_1,
      gift_2,
      gift_3,
    });

    return res.json(giftsEdited);
  }
}
