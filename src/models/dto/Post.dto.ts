import { CommentDto } from "./Comment.dto";
import { UserDto } from "./User.dto";

export interface PostDto {
  id: number;
  userId: number;
  body: string;
  title: string;

  author?: UserDto;
  comments?: CommentDto[];
}
