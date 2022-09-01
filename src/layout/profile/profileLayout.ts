import Block from "../../utils/Block";
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

export default class ProfileLayout extends Block {
  render() {
    return this.compile(tpl, {...this.props, wrapperClass:styles.wrapper, leftBlockClass:styles.back_block,rightBlockClass:styles.profile_block, displayNameClass: styles.display_name });
  }
}