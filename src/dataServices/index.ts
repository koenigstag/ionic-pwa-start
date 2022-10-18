import httpClient from './httpClient';
import { PostService } from './PortService';
import { UserService } from './UserService';

export const client = httpClient();

export const postService = new PostService(client);
export const userService = new UserService(client);
