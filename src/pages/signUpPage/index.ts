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
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthApi';

const router = new Router('.app');
export default class SignupPage extends Block {
  constructor() {
    super({})
  }

  init() {
    this.children.link = new Link({
      label: 'Войти',
      events: {
        click: () => router.go('/'),
      },
    });

    this.children.form = new Form({
      name: 'formSignin',
      inputEmail: new Input({
        placeholder: 'Почта',
        name: 'email',
        type: 'email',
        events: {
          focus: (e) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          blur: (e) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        },
      }),
      inputLogin: new Input({
        placeholder: 'Логин',
        name: 'login',
        type: 'text',
        events: {
          focus: (e) => (isValid(e.target.name, e.target?.value) ? showMessage(e.target) : hideMessage(e.target)),
          blur: (e) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        },
      }),
      inputFirstName: new Input({
        placeholder: 'Имя',
        name: 'first_name',
        type: 'text',
        events: {
          focus: (e) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          blur: (e) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        },
      }),
      inputSecondName: new Input({
        placeholder: 'Фамилия',
        name: 'second_name',
        type: 'text',
        events: {
          focus: (e) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
          blur: (e) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        },
      }),
      inputPhone: new Input({
        placeholder: 'Телефон',
        name: 'phone',
        type: 'tel',
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
      inputPassRpt: new Input({
        placeholder: 'Пароль (еще раз)',
        name: 'passwordrpt',
        type: 'password',
      }),
      button: new Button({
        label: 'Зарегистрироваться',
        type: 'submit',
      }),
      events: {
        submit: (e) => {
          e.preventDefault();
          const data = formValidation(e.target) as SignupData
          AuthController.signup(data)
        },
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles })
  }
}
