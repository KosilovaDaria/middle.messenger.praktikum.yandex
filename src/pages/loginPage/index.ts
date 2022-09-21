import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Link from '../../components/link/Link';
import AuthLayout from '../../layout/auth/authLayout';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';
import Router from '../../utils/Router';
import { SigninData } from '../../api/AuthApi';
import AuthController from '../../controllers/AuthController';

const router = new Router('.app');

const button = new Button({
  label: 'Авторизоваться',
  type: 'submit',
})

const link = new Link({
  label: 'Нет аккаунта?',
  events: {
    click: () => router.go('/sign-up'),
  },
});

const form = new Form({
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
  button,
  events: {
    submit: (e) => {
      e.preventDefault();
      const data = formValidation(e.target) as SigninData
      console.log(data)
      AuthController.signin(data)
      // router.go('/messenger')
    },
  },
});

const LoginPage = new AuthLayout({
  title: 'Вход',
  form,
  link,
});

export default LoginPage;


// export default class LoginPage extends Block {
//   constructor() {
//     super({})
//   }
//   init() {
//     this.children.button = new Button({
//       label: 'Авторизоваться',
//       type: 'submit',
//     })
//   }
//   render() {
//     return this.compile(tpl, {...this.props})
//   }
// }