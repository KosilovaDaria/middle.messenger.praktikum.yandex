import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';
import attachBtn from '../../assets/img/attachBtn.png';

export default class ChatDialog extends Block {
  render() {
    return this.compile(tpl, {
      ...this.props,
      headerClass: styles.dialog_header,
      infoClass: styles.dialog_info,
      toolsClass: styles.header_tools,
      containerClass: styles.dialog_container,
      dateClass: styles.dialog_date,
      inputBlockClass: styles.dialog_input,
      btnClass: styles.button_attach,
      img: attachBtn,
    });
  }
}
