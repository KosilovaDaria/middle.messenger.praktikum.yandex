import Block from "../../utils/Block";
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

export default class ChatList extends Block {
  render() {
    return this.compile(tpl, {
      ...this.props, contentClass: styles.item_content, nameClass: styles.user_name, msgClass: styles.user_messege, dateClass: styles.item_date
    });
  }
}
