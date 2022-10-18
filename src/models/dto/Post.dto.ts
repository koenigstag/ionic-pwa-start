import { UserDto } from "./User.dto";

export interface PostDto {
  id: number;
  userId: number;
  body: string;
  title: string;

  author?: UserDto;
}
