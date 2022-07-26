import layout from '../../layout/profile/tpl.hbs';
import button from '../../components/button';
import { profileInfo } from '../../modules/profile/index';
import * as layoutStyle from '../../layout/profile/style.module.css';
import * as btnStyle from '../../components/button/style.module.css';

const SettingsPage = layout({
	wrapperClass: layoutStyle.wrapper,
	leftBlockClass: layoutStyle.back_block,
	button: button('button_back', '<', 'button', 'http://localhost:3000/chat', btnStyle.button_round),
	rightBlockClass: layoutStyle.profile_block,
	content: profileInfo,
	controls: button('btn', 'Сохранить', 'submit', 'http://localhost:3000/profile'),
});
export default SettingsPage;