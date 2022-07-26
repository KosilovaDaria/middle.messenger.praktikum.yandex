import layout from '../../layout/auth/tpl.hbs';
import tpl from './tpl.hbs';
import button from '../../components/button';
import input from '../../components/input';
import link from '../../components/link';
import * as style from '../../layout/auth/style.module.css';

const pageContent = tpl({
	inpteml: input('email', 'email', 'Почта'),
	inptlgn: input('text', 'login', 'Логин'),
	inptfrstnme: input('text', 'first_name', 'Имя'),
	inptsecnme: input('text', 'second_name', 'Фамилия'),
	inptnumb: input('tel', 'phone', 'Телефон'),
	inptpass: input('password', 'password', 'Пароль'),
	inptpassrpt: input('password', 'password', 'Пароль (еще раз)'),
});
const SignUpPage = layout({
	formClass: style.form,
	inputGroupClass: style.input_group,
	wrapperClass: style.wrapper,
	blockClass: style.block,
	titleClass: style.title,
	title: 'Регистрация',
	content: pageContent,
	button: button('signup_button', 'Зарегистрироваться'),
	link: link('Войти', 'http://localhost:3000/login')
});
export default SignUpPage;