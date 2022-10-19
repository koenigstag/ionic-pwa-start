import { PostDto } from './Post.dto';
import { UserDto } from './User.dto';

export interface BlogDto extends UserDto {
  posts?: PostDto[];
}
