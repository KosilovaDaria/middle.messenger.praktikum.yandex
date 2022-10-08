import API, { UserApi, UserData, UserPassword } from '../api/UserApi';
import Router from '../utils/Router';
import store from '../utils/Store';

const router = new Router('.app');

class UserController {
  private readonly api: UserApi;
  constructor() {
    this.api = API;
  }
  async searchuser(login: string) {
    try {
      await this.api.searchuser(login);
    } catch (e: any) {
      alert(e);
    }
  }
  async getuser(id: number) {
    try {
      await this.api.getuser(id);
    } catch (e: any) {
      alert(e);
    }
  }
  async editprofile(data: UserData) {
    try {
      await this.api.editprofile(data);
      router.go('/profile');
    } catch (e: any) {
      alert(e);
    }
  }
  async editavatar(data: any) {
    try {
      await this.api.editavatar(data);
      router.go('/profile');
    } catch (e: any) {
      alert(e);
    }
  }
  async editpassword(data: UserPassword) {
    try {
      await this.api.editpassword(data);
      router.go('/profile');
    } catch (e: any) {
      alert(e);
    }
  }
  async fetchUsers(login: string) {
    const users = await this.api.searchuser(login);
    store.set('users', users);
    const { id } = store.getState().users.find((user: any) => user.login === login);
    this.getuser(id)
    return id
  }
}

export default new UserController();
