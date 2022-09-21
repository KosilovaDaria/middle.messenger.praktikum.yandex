import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Link from '../../components/link/Link';
import AuthLayout from '../../layout/auth/authLayout';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';
import Router from '../../utils/Router';

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
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  inputPass: new Input({
    placeholder: 'Пароль',
    name: 'password',
    type: 'password',
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