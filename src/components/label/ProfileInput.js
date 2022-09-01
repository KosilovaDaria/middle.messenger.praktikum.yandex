import Block from "../../services/Block";
import tpl from './tpl.hbs';
// import * as styles from './style.module.css';

export default class ProfileInput extends Block {
  render() {
    return this.compile(tpl, {...this.props});
  }
}