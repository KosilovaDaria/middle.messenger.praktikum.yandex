import Block from '../../utils/Block';
import tpl from '../../layout/auth/tpl.hbs';
import * as styles from '../../layout/auth/style.module.css';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Link from '../../components/link/Link';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';
import Router from '../../utils/Router';
import { SigninData } from '../../api/AuthApi';
import AuthController from '../../controllers/AuthController';

const router = new Router('.app');

export default class LoginPage extends Block {
  constructor() {
    super({})
  }
  init() {
    this.children.link = new Link({
      label: 'Нет аккаунта?',
      events: {
        click: () => router.go('/sign-up'),
      },
    });
    this.children.form = new Form({
      name: 'formLogin',
      inputLogin: new Input({
        placeholder: 'Логин',
        name: 'login',
        type: 'text',
        events: {
          focus: (e) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          blur: (e) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        },
      }),
      inputPass: new Input({
        placeholder: 'Пароль',
        name: 'password',
        type: 'password',
        events: {
          focus: (e) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          blur: (e) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        },
      }),
      button: new Button({
        label: 'Авторизоваться',
        type: 'submit',
      }),
      events: {
        submit: (e) => {
          e.preventDefault();
          const data = formValidation(e.target) as SigninData
          console.log(data)
          AuthController.signin(data)
        },
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles })
  }
}
