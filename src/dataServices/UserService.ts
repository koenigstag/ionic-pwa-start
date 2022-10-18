import { AxiosInstance } from 'axios';
import { UserDto } from '../types/User.dto';

export class UserService {
  path = '/users';

  constructor(private readonly client: AxiosInstance) {}

  public async findById(id: string | number): Promise<UserDto> {
    return (await this.client.get(`${this.path}/${id}`)) as any;
  }

  public async findUsers(ids?: number[] | string[]): Promise<UserDto[]> {
    return (await this.client.get(
      `${this.path}?${ids?.map((i) => `id=${i}`).join('&')}`
    )) as any;
  }
}
