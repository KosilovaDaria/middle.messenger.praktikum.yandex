import API, { AuthApi, SigninData, SignupData } from '../api/AuthApi';

export class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = API;
  }

  async signin(data:SigninData) {
    console.log(this.api)
    await this.api.signin(data);
  }

  async signup(data:SignupData) {
    await this.api.signup(data);
  }

  async fetchUser() {
    await this.api.read();
  }
  async logout() {
    await this.api.logout();
  }
}

export default new AuthController();
