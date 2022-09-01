import Block from "../../utils/Block";
// import tpl from './tpl.hbs';
import * as style from'./style.module.css';

export default class Input extends Block {
  render() {
    return this.compile(() => '', {...this.props, mainClass:style.input});
  }
}
