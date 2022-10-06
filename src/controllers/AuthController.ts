import API, { AuthApi, SigninData, SignupData } from '../api/AuthApi';
import store from '../utils/Store';
import Router from '../utils/Router';

const router = new Router('.app');

class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = API;
  }

  async signin(data:SigninData) {
    try {
      await this.api.signin(data);
      router.go('/messanger');
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data:SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  async logout() {
    try {
      await this.api.logout();
      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
