import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Link from '../../components/link/Link';
import AuthLayout from '../../layout/auth/authLayout';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';

import * as styleInput from '../../components/input/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import * as styleLink from '../../components/link/style.module.css';
import * as styleLayout from '../../layout/auth/style.module.css';

const button = new Button({
  label: 'Зарегистрироваться',
  attr: {
    class: styleButton.button,
    type: 'submit',
  },
});

const link = new Link({
  label: 'Войти',
  attr: {
    class: styleLink.link_block,
    href: '/login',
  },
});

const form = new Form('form', {
  attr: {
    class: styleLayout.form,
  },
  inputEmail: new Input('input', {
    attr: {
      placeholder: 'Почта',
      name: 'email',
      class: styleInput.input,
      type: 'email',
    },
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
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
  inputFirstName: new Input('input', {
    attr: {
      placeholder: 'Имя',
      name: 'first_name',
      class: styleInput.input,
      type: 'text',
    },
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  inputSecondName: new Input('input', {
    attr: {
      placeholder: 'Фамилия',
      name: 'second_name',
      class: styleInput.input,
      type: 'text',
    },
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  inputPhone: new Input('input', {
    attr: {
      placeholder: 'Телефон',
      name: 'phone',
      class: styleInput.input,
      type: 'tel',
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
  inputPassRpt: new Input('input', {
    attr: {
      placeholder: 'Пароль (еще раз)',
      name: 'passwordrpt',
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
    },
  },
});

const SignupPage = new AuthLayout('div', {
  attr: {
    class: styleLayout.wrapper,
  },
  title: 'Регистрация',
  form,
  link,
});

export default SignupPage;
