import { AxiosInstance } from 'axios';
import { CommentDto } from '../models/dto/Comment.dto';

export class CommentService {
  path = '/comments';

  constructor(private readonly client: AxiosInstance) {}

  public async findComments(filter: {
    ids?: number[] | string[];
    authorId?: string | number;
    postId?: string | number;
  }): Promise<CommentDto[]> {
    const { ids, authorId, postId } = filter;

    const idsParams = ids?.map((i) => `id=${i}`).join('&');
    const authorParam = `userId=${authorId}`;
    const postParam = `postId=${postId}`;

    const params = filter ? [idsParams, authorParam, postParam].join('&') : '';

    return (await this.client.get(`${this.path}?${params}`)) as any;
  }
}
