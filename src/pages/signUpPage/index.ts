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
  label: 'Зарегистрироваться',
  attr: {
    class: styleButton.button,
    type: 'submit',
  },
  events: {
    click: (e) => {
      console.log('button click');
      e.preventDefault();
      e.stopPropagation();
    }
  }
});

const link = new Link('a', {
  label: 'Войти',
  attr: {
    class: styleLink.link_block,
    href: '/login'
  }
});

const form = new Form('form', {
  attr: {
    class: styleLayout.form
  },
  inputEmail: new Input('input', {
    attr: {
      placeholder: 'Почта',
      name: 'email',
      class: styleInput.input,
      type: 'email',
    }
  }),
  inputLogin: new Input('input', {
    attr: {
      placeholder: 'Логин',
      name: 'login',
      class: styleInput.input,
      type: 'text',
    }
  }),
  inputFirstName: new Input('input', {
    attr: {
      placeholder: 'Имя',
      name: 'first_name',
      class: styleInput.input,
      type: 'text',
    }
  }),
  inputSecondName: new Input('input', {
    attr: {
      placeholder: 'Фамилия',
      name: 'second_name',
      class: styleInput.input,
      type: 'text',
    }
  }),
  inputPhone: new Input('input', {
    attr: {
      placeholder: 'Телефон',
      name: 'phone',
      class: styleInput.input,
      type: 'tel',
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
  inputPassRpt: new Input('input', {
    attr: {
      placeholder: 'Пароль (еще раз)',
      name: 'password',
      class: styleInput.input,
      type: 'password',
    }
  }),
  button: button,
  events: {
    submit: (e) => {
      e.preventDefault();
      const data = e.target;
      console.log('submit');
      e.stopPropagation();
    }
  }
});

const SignupPage = new AuthLayout('div', {
  attr: {
    class: styleLayout.wrapper
  },
  title: 'Регистрация',
  form: form,
  link: link
});

export default SignupPage;