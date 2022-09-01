import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import Link from "../../components/link/Link";
import AuthLayout from "../../layout/auth/authLayout";
import * as styleLayout from '../../layout/auth/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleLink from '../../components/link/style.module.css';

const button = new Button({
  label: 'Авторизоваться',
  attr: {
    class: styleButton.button,
    type: 'submit',
  },
  events: {
    click: (e) => {
      console.log('Авторизация');
      e.preventDefault();
      e.stopPropagation();
    }
  }
})

const link = new Link('a', {
  label: 'Нет аккаунта?',
  attr: {
    class: styleLink.link_block,
    href: '/signup'
  }
});

const form = new Form('form', {
  attr: {
    class: styleLayout.form
  },
  inputLogin: new Input('input', {
    attr: {
      placeholder: 'Логин',
      name: 'login',
      class: styleInput.input,
      type: 'text',
    }
  }),
  inputPass: new Input('input', {
    attr: {
      placeholder: 'Пароль',
      name: 'password',
      class: styleInput.input,
      type: 'password',
    }
  }),
  button: button,
});

const LoginPage = new AuthLayout('div', {
  attr: {
    class: styleLayout.wrapper
  },
  title: 'Вход',
  form: form,
  link: link
});

export default LoginPage;