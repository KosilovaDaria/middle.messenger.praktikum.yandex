import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Link from '../../components/link/Link';
import AuthLayout from '../../layout/auth/authLayout';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';
import Router from '../../utils/Router';

import * as styleInput from '../../components/input/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import * as styleLink from '../../components/link/style.module.css';
import * as styleLayout from '../../layout/auth/style.module.css';

const router = new Router('.app');

const button = new Button({
  label: 'Авторизоваться',
  attr: {
    class: styleButton.button,
    type: 'submit',
  },
})

const link = new Link({
  label: 'Нет аккаунта?',
  attr: {
    class: styleLink.link_block,
    // href: '/sign-up',
  },
  events: {
    click: () => router.go('/sign-up'),
  },
});

const form = new Form('form', {
  attr: {
    class: styleLayout.form,
    name: 'formLogin',
  },
  inputLogin: new Input('input', {
    attr: {
      placeholder: 'Логин',
      name: 'login',
      class: styleInput.input,
      type: 'text',
    },
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  inputPass: new Input('input', {
    attr: {
      placeholder: 'Пароль',
      name: 'password',
      class: styleInput.input,
      type: 'password',
    },
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  button,
  events: {
    submit: (e: any) => {
      e.preventDefault();
      console.log(formValidation(e.target))
      router.go('/messenger')
    },
  },
});

const LoginPage = new AuthLayout('div', {
  attr: {
    class: styleLayout.wrapper,
  },
  title: 'Вход',
  form,
  link,
});

export default LoginPage;
