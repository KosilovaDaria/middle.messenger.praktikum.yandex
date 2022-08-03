import tpl from './tpl.hbs';
import avatar from '../../components/avatar';
import messege from '../../components/messege';
import * as style from './style.module.css';
import * as btnStyle from '../../components/button/style.module.css';
import img from '../../../dist/img/btn_msg.png';

const chatDialog = () => {
	return tpl({
		headerClass: style.dialog_header,
		infoClass: style.dialog_info,
		avatar: avatar('avatar_chat-dialog'),
		name: 'Вадим',
		toolsClass: style.header_tools,
		containerClass: style.dialog_container,
		msg: messege('Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.', '12:39', 'messege_to'),
		messege: messege('Круто!', '11:56', 'messege_from'),
		inputBlockClass: style.dialog_input,
		btnClass: style.button_attach,
		inputClass: style.messege_input,
		className: btnStyle.button_round,
		img: img
	});
};
export default chatDialog;