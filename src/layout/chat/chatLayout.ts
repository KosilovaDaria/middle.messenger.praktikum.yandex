import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

export default class ChatLayout extends Block {
  constructor(props:any) {
    super({ ...props })
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      styles,
      // listBlockClass: styles.list_block,
      // linkClass: styles.link,
      // inputClass: styles.search_input,
      // listClass: styles.chat_list,
      // dialogBlockClass: styles.dialog_block,
    });
  }
}
