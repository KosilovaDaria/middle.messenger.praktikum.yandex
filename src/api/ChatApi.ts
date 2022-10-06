import { User } from './AuthApi';
import BaseAPI from './BaseApi';

export type ChatTitle = {
  title: string
}
export type ChatInfo = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: {
    user: User,
    time: string;
    content: string
  }
}

export type Users = {
  users: [number],
  chatId: number
}
export class ChatApi extends BaseAPI {
  constructor() {
    super('/chats')
  }
  create(title: string) {
    return this.http.post('/', { title });
  }
  delete(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id });
  }
  read(): Promise<ChatInfo[]> {
    return this.http.get('/');
  }
  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`)
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }
  addChatAvatar(data: any) {
    return this.http.put('/avatar', data);
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}
export default new ChatApi();
