import tpl from './tpl.hbs';
import avatar from '../../components/avatar';
import * as style from './style.module.css';

const list = [
	{
		id: 0,
		name: "Андрей",
		avatar: "smth",
		lastMessege: "Изображение",
		time: "10:49"
	},
	{
		id: 1,
		name: "Киноклуб",
		avatar: "smth",
		lastMessege: "Вы: стикер",
		time: "12:00"
	},
	{
		id: 2,
		name: "Илья",
		avatar: "smth",
		lastMessege: "Друзья, у меня для вас особенный выпуск новостей!...",
		time: "15:12"
	},
	{
		id: 3,
		name: "Вадим",
		avatar: "smth",
		lastMessege: "Вы: Круто!",
		time: "Пт"
	},
	{
		id: 4,
		name: "тет-а-теты",
		avatar: "smth",
		lastMessege: "И Human Interface Guidelines и Material Design рекомендуют...",
		time: "Ср"
	}
];

const chatList = () => {
	const listItem = list.map(item => {
		return tpl({
			itemClass: style.list_item,
			avatar: avatar('avatar_chat'),
			contentClass: style.item_content,
			nameClass: style.user_name,
			from: item.name,
			msgClass: style.user_messege,
			lastMessege: item.lastMessege,
			timeClass: style.item_time,
			time: item.time
		});
	});
	return listItem;
};

export default chatList;