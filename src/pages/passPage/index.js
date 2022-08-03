import layout from '../../layout/profile/tpl.hbs';
import {passChange} from '../../modules/profile/index';
import * as layoutStyle from '../../layout/profile/style.module.css';
import * as btnStyle from '../../components/button/style.module.css';

const PassPage = layout({
  wrapperClass: layoutStyle.wrapper,
  leftBlockClass: layoutStyle.back_block,
  className: btnStyle.button_round,
  rightBlockClass: layoutStyle.profile_block,
  content: passChange,
});

export default PassPage;