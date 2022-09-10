import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

export default class AuthLayout extends Block {
  render() {
    return this.compile(tpl, {
      ...this.props,
      blockClass: styles.block,
      titleClass: styles.title,
      linkClass: styles.link_block,
    });
  }
}
