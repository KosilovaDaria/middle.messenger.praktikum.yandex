import Block from '../../utils/Block';
import tpl from '../../layout/profile/tpl.hbs';
import * as styles from '../../layout/profile/style.module.css';
import * as styleForm from '../../components/form/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import Form from '../../components/form/Form';
import ProfileInput from '../../components/profileInput/ProfileInput';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/button/Button';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';
import Router from '../../utils/Router';
import { isEqual } from '../../utils/helpers';
import store, { StoreEvents } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import { UserPassword } from '../../api/UserApi';

const router = new Router('.app');

class PassPage extends Block {
  constructor() {
    super({})
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    const avatarPath = `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`;
    const avatar = document.getElementById('avatarImage');
    avatar?.setAttribute('src', avatarPath);

    const fieldsOrder = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

    fieldsOrder.forEach((field) => {
      Object.keys(this.children.form.children).forEach(key => {
        if (this.children.form.children[key].children.input?.props.name == field) {
          this.children.form.children[key].children.input?.setProps({ placeholder: newProps[field] })
        }
      })
    })
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    return true
  }
  init() {
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState().user || {})
    })

    AuthController.fetchUser();

    this.children.link = new Link({
      label: '<',
      attr: { class: styleButton.button_round },
      events: {
        click: () => router.back(),
      },
    });
    this.children.avatar = new Avatar({
      attr: { class: styleAvatar.avatar_profile },
    });
    this.children.form = new Form({
      name: 'formProfile',
      attr: {
        class: styleForm.profile_info,
      },
      inputOldPass: new ProfileInput({
        attr: { class: styleInputProfile.block_extra },
        label: 'Старый пароль',
        input: new Input({
          placeholder: '*****',
          name: 'oldPassword',
          type: 'password',
          attr: { class: styleInput.input_profile },
        }),
      }),
      inputPass: new ProfileInput({
        attr: { class: styleInputProfile.block_extra },
        label: 'Новый пароль',
        input: new Input({
          placeholder: '*******',
          name: 'newPassword',
          type: 'password',
          events: {
            focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
            blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          },
          attr: { class: styleInput.input_profile },
        }),
      }),
      inputPassRpt: new ProfileInput({
        attr: { class: styleInputProfile.block_extra },
        label: 'Повторите новый пароль',
        input: new Input({
          placeholder: '*******',
          name: 'newPassword',
          type: 'password',
          events: {
            focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
            blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          },
          attr: { class: styleInput.input_profile },
        }),
      }),
      button: new Button({
        label: 'Сохранить',
        type: 'submit',
      }),
      events: {
        submit: (e) => {
          e.preventDefault();
          const data = formValidation(e.target) as UserPassword
          console.log(data)
          UserController.editpassword(data)
        },
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles })
  }
}
export default PassPage;
