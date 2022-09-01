import Block from "../../utils/Block";
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

// export default (id, label, type, name, placeholder, disabled, extraBlockClass) => {
//   return tpl({blockClass:style.block, inputClass:style.input, id, label, type, name, placeholder, disabled, extraBlockClass});
// };
export default class ProfileInput extends Block {
  render() {
    return this.compile(tpl, {...this.props,blockClass:styles.block,});
  }
}