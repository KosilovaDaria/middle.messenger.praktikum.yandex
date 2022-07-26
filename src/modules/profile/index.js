import tpl from './tpl.hbs';
import avatarprofile from '../../components/avatarProfile';
import inputprofile from '../../components/inputProfile';
import * as style from './style.module.css';

export const profileInfo = () => {
	return tpl({
		avatar: avatarprofile('file', 'file', 'file'),
		displayNameClass: style.display_name,
		formClass: style.profile_info,
		displayname: 'Иван',
		inputeml: inputprofile('email', 'Почта', 'email', 'email', 'pochta@yandex.ru'),
		inputlgn: inputprofile('login', 'Логин', 'text', 'text', 'ivanivanov'),
		inputfrstnme: inputprofile('first_name', 'Имя', 'text', 'text', 'Иван'),
		inputsecnme: inputprofile('second_name', 'Фамилия', 'text', 'text', 'Иванов'),
		inputdsplnme: inputprofile('display_name', 'Имя в чате', 'text', 'text', 'Иван'),
		inputphnum: inputprofile('phone', 'Телефон', 'tel', 'tel', '+7 (909) 967 30 30'),
	});
};
export const passChange = () => {
	return tpl({
		avatar: avatarprofile('file', 'file', 'file'),
		displayNameClass: style.display_name,
		formClass: style.profile_info,
		displayname: 'Иван',
		inputoldpass: inputprofile('oldpass', 'Старый пароль', 'password', 'password', '*******'),
		inputnewpass: inputprofile('newpass', 'Новый пароль', 'password', 'password', '*********'),
		inputnewpassrt: inputprofile('newpass', 'Повторите новый пароль', 'password', 'password', '*********'),
	});
};