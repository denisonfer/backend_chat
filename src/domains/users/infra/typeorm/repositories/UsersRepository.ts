import { ICreateUserDto } from '@domains/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    device_id,
  }: ICreateUserDto): Promise<User> {
    return this.ormRepository.create({
      name,
      email,
      password,
      device_id,
    });
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }
}
