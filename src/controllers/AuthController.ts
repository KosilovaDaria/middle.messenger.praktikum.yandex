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
      alert(e);
    }
  }

  async signup(data:SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go('/profile');
    } catch (e: any) {
      alert(e.message);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();
      store.set('user', user);
    } catch (e: any) {
      alert(e.message);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      router.go('/');
    } catch (e: any) {
      alert(e.message);
    }
  }
}

export default new AuthController();
