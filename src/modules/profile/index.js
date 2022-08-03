import tpl from './tpl.hbs';
import avatarprofile from '../../components/avatarProfile';
import inputprofile from '../../components/inputProfile';
import button from '../../components/button';
import * as style from './style.module.css';
import * as inputStyle from '../../components/inputProfile/style.module.css';

export const profileInfo = () => {
	return tpl({
		avatar: avatarprofile('file', 'file', 'file', 'disabled'),
		displayNameClass: style.display_name,
		formClass: style.profile_info,
		displayname: 'Иван',
		inputeml: inputprofile('email', 'Почта', 'email', 'email', 'pochta@yandex.ru', 'disabled'),
		inputlgn: inputprofile('login', 'Логин', 'text', 'text', 'ivanivanov','disabled'),
		inputfrstnme: inputprofile('first_name', 'Имя', 'text', 'text', 'Иван', 'disabled'),
		inputsecnme: inputprofile('second_name', 'Фамилия', 'text', 'text', 'Иванов','disabled'),
		inputdsplnme: inputprofile('display_name', 'Имя в чате', 'text', 'text', 'Иван','disabled'),
		inputphnum: inputprofile('phone', 'Телефон', 'tel', 'tel', '+7 (909) 967 30 30','disabled'),
	});
};
export const profileSettings = () => {
	return tpl({
		avatar: avatarprofile('file', 'file', 'file'),
		formClass: style.profile_info,
		action: 'http://localhost:3000/profile',
		inputeml: inputprofile('email', 'Почта', 'email', 'email', 'pochta@yandex.ru'),
		inputlgn: inputprofile('login', 'Логин', 'text', 'text', 'ivanivanov'),
		inputfrstnme: inputprofile('first_name', 'Имя', 'text', 'text', 'Иван'),
		inputsecnme: inputprofile('second_name', 'Фамилия', 'text', 'text', 'Иванов'),
		inputdsplnme: inputprofile('display_name', 'Имя в чате', 'text', 'text', 'Иван'),
		inputphnum: inputprofile('phone', 'Телефон', 'tel', 'tel', '+7 (909) 967 30 30'),
		button: button('btn', 'Сохранить', 'submit',),
		
	});
};
export const passChange = () => {
	return tpl({
		avatar: avatarprofile('file', 'file', 'file', 'disabled'),
		formClass: style.profile_info,
		action: 'http://localhost:3000/profile',
		inputoldpass: inputprofile('oldpass', 'Старый пароль', 'password', 'password', '*******',),
		inputnewpass: inputprofile('newpass', 'Новый пароль', 'password', 'password', '*********',),
		inputnewpassrt: inputprofile('newpass', 'Повторите новый пароль', 'password', 'password', '*********', '' , inputStyle.block_extra),
		button: button('btn', 'Сохранить', 'submit'),
	});
};