export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  avatarSrc?: string;

  address?: object;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}