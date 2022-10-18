import { AxiosInstance } from 'axios';
import { PostDto } from '../types/Post.dto';

export class PostService {
  path = '/posts';

  constructor(private readonly client: AxiosInstance) {}

  public async findPosts(filter?: {
    ids?: string[] | number[];
    authorId?: string | number;
  }): Promise<PostDto[]> {
    const { ids, authorId } = filter ?? {};

    const idsParams = ids?.map((i) => `id=${i}`).join('&');
    const authorParam = `userId=${authorId}`;

    const params = filter ? authorParam ? `${authorParam}&${idsParams}` : idsParams : '';

    return (await this.client.get(`${this.path}?${params}`)) as any;
  }

  public async getTrandingPosts(): Promise<PostDto[]> {
    const randomIds = Array(5)
      .fill(1)
      .map(() => Math.floor(Math.random() * 100));

    const posts: PostDto[] = (await this.client.get(
      `${this.path}?${randomIds.map((id) => `id=${id}`).join('&')}`
    )) as any;

    return posts;
  }

  public async findById(id: string | number): Promise<PostDto> {
    return (await this.client.get(`${this.path}/${id}`)) as any;
  }
}
