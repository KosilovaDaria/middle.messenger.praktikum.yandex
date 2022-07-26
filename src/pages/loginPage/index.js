import layout from '../../layout/auth/tpl.hbs';
import tpl from './tpl.hbs';
import button from '../../components/button';
import input from '../../components/input';
import link from '../../components/link';
import * as style from '../../layout/auth/style.module.css';

const pageContent = tpl({
  inputlogin: input('text', 'login', 'Логин'),
  inputpass: input('password', 'password', 'Пароль'),
});

const LoginPage = layout({
  wrapperClass: style.wrapper,
  blockClass: style.block,
  titleClass: style.title,
  formClass: style.form,
  inputGroupClass: style.input_group,
  title: 'Вход',
  content: pageContent,
  button: button('login_button', 'Авторизоваться', 'submit', 'http://localhost:3000/chat'),
  link: link('Нет аккаунта?', 'http://localhost:3000/signup')
});

export default LoginPage;