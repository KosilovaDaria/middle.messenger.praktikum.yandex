import layout from '../../layout/profile/tpl.hbs';
import tpl from './tpl.hbs';
import link from '../../components/link';
import {profileInfo} from '../../modules/profile/index';
import * as layoutStyle from '../../layout/profile/style.module.css';
import * as btnStyle from '../../components/button/style.module.css';
import * as linkStyle from '../../components/link/style.module.css';

const editsContent = tpl({
	linkdata: link('Изменить данные', 'http://localhost:3000/settings', linkStyle.link_controls),
	linkpass: link('Изменить пароль', 'http://localhost:3000/pass', linkStyle.link_controls),
	linkquit: link('Выйти', 'http://localhost:3000/login', linkStyle.link_controls)
});

const ProfilePage = layout({
	wrapperClass: layoutStyle.wrapper,
	leftBlockClass: layoutStyle.back_block,
	className: btnStyle.button_round,
	rightBlockClass: layoutStyle.profile_block,
	content: profileInfo,
	controls: editsContent
});

export default ProfilePage;