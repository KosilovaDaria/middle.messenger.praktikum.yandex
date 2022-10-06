import Block from '../../utils/Block';
import tpl from '../../layout/profile/tpl.hbs';
import * as styles from '../../layout/profile/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleForm from '../../components/form/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import Form from '../../components/form/Form';
import Avatar from '../../components/avatar/Avatar';
import ProfileInput from '../../components/profileInput/ProfileInput';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Button from '../../components/button/Button';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';
import Router from '../../utils/Router';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import store, { StoreEvents } from '../../utils/Store';
import { UserData } from '../../api/UserApi';

const router = new Router('.app');
class SettingsPage extends Block {
  constructor() {
    super({})
  }

  componentDidUpdate(_oldProps: any, newProps: any) {
    const avatarPath = `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`;
    const avatar = document.getElementById('avatarImage');
    avatar?.setAttribute('src', avatarPath);
    const fieldsOrder = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

    fieldsOrder.forEach((field) => {
      Object.keys((this.children.form as any).children).forEach(key => {
        if (this.children.form.children[key].children.input?.props.name == field) {
          this.children.form.children[key].children.input?.setProps({ placeholder: newProps[field] })
        }
      })
    })
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
      inputEmail: new ProfileInput({
        attr: { class: styleInputProfile.block },
        label: 'Почта',
        input: new Input({
          placeholder: '',
          name: 'email',
          type: 'email',
          events: {
            focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
            blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          },
          attr: {
            class: styleInput.input_profile,
          },
        }),
      }),
      inputLogin: new ProfileInput({
        attr: { class: styleInputProfile.block },
        label: 'Логин',
        input: new Input({
          placeholder: '',
          name: 'login',
          type: 'text',
          events: {
            focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
            blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          },
          attr: {
            class: styleInput.input_profile,
          },
        }),
      }),
      inputFirstName: new ProfileInput({
        attr: { class: styleInputProfile.block },
        label: 'Имя',
        input: new Input({
          placeholder: '',
          name: 'first_name',
          type: 'text',
          events: {
            focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
            blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          },
          attr: {
            class: styleInput.input_profile,
          },
        }),
      }),
      inputSecondName: new ProfileInput({
        attr: { class: styleInputProfile.block },
        label: 'Фамилия',
        input: new Input({
          placeholder: '',
          name: 'second_name',
          type: 'text',
          events: {
            focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
            blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          },
          attr: {
            class: styleInput.input_profile,
          },
        }),
      }),
      inputDisplayName: new ProfileInput({
        attr: { class: styleInputProfile.block },
        label: 'Имя в чате',
        input: new Input({
          placeholder: '',
          name: 'display_name',
          type: 'text',
          events: {
            focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
            blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          },
          attr: {
            class: styleInput.input_profile,
          },
        }),
      }),
      inputPhone: new ProfileInput({
        attr: { class: styleInputProfile.block },
        label: 'Телефон',
        input: new Input({
          placeholder: '',
          name: 'phone',
          type: 'phone',
          events: {
            focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
            blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          },
          attr: {
            class: styleInput.input_profile,
          },
        }),
      }),
      button: new Button({
        label: 'Сохранить',
        type: 'submit',
      }),
      events: {
        submit: (e) => {
          e.preventDefault();
          const data = formValidation(e.target) as UserData
          console.log(data)
          UserController.editprofile(data)
        // router.go('/messenger')
        },
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles })
  }
}

export default SettingsPage;
