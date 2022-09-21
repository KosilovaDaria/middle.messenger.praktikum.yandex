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
  label: 'Зарегистрироваться',
  type: 'submit',
});

const link = new Link({
  label: 'Войти',
  events: {
    click: () => router.go('/'),
  },
});

const form = new Form({
  inputEmail: new Input({
    placeholder: 'Почта',
    name: 'email',
    type: 'email',
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  inputLogin: new Input({

    placeholder: 'Логин',
    name: 'logput',
    type: 'text',
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  inputFirstName: new Input({

    placeholder: 'Имя',
    name: 'first_naput',
    type: 'text',
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  inputSecondName: new Input({

    placeholder: 'Фамилия',
    name: 'second_naput',
    type: 'text',
    events: {
      focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
    },
  }),
  inputPhone: new Input({

    placeholder: 'Телефон',
    name: 'phnput',
    type: 'tel',
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
  inputPassRpt: new Input({

    placeholder: 'Пароль (еще раз)',
    name: 'passwordrpt',
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
      router.go('/')
    },
  },
});

const SignupPage = new AuthLayout({
  title: 'Регистрация',
  form,
  link,
});

export default SignupPage;
