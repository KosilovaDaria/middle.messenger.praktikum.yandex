import API, { ChatApi } from '../api/ChatApi';
import store from '../utils/Store';
import MessageController from './MessageController';

class ChatController {
  private readonly api: ChatApi;

  constructor() {
    this.api = API;
  }
  async create(title: string) {
    try {
      await this.api.create(title);
    } catch (e: any) {
      console.error(e);
    }
    this.fetchChats()
  }
  async fetchChats() {
    const chats = await this.api.read();
    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessageController.connect(chat.id, token)
    })
    store.set('chats', chats);
  }
  async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUsers(id, [userId]);
      this.fetchChats()
    } catch (e: any) {
      console.error(e);
    }
  }
  async addChatAvatar(data: any) {
    try {
      await this.api.addChatAvatar(data);
      this.fetchChats()
    } catch (e: any) {
      console.error(e);
    }
  }
  async getUsers(id:number) {
    await this.api.getUsers(id)
  }
  async delete(id: number) {
    try {
      await this.api.delete(id);
    } catch (e: any) {
      console.error(e);
    }
    this.fetchChats()
  }
  selectChat(id:number) {
    store.set('selectedChat', id);
  }
  getToken(id: number) {
    return this.api.getToken(id)
  }
}

export default new ChatController();
