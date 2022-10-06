import BaseAPI from './BaseAPI';

export type UserData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}
export type UserPassword = {
  oldPassword: string,
  newPassword: string
}

export class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }
  searchuser(login: string) {
    return this.http.post('/search', { login })
  }
  getuser(id: number) {
    return this.http.get(`/${id}`)
  }
  editprofile(data: UserData) {
    return this.http.put('/profile', data);
  }
  editavatar(data: any) {
    return this.http.put('/profile/avatar', data);
  }
  editpassword(data: UserPassword) {
    return this.http.put('/password', data);
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserApi();
