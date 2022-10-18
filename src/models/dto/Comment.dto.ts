import { UserDto } from "./User.dto";

export interface CommentDto {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;

  author?: UserDto;
}