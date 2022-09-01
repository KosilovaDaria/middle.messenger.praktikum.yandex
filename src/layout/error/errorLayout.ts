import Block from "../../utils/Block";
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

export default class ErrorLayout extends Block {
  render() {
    return this.compile(tpl, {...this.props, titleClass:styles.title,messegeClass:styles.messege });
  }
}