import Block from "../../utils/Block";
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

export default class Form extends Block {
  render() {
    return this.compile(tpl, { ...this.props, mainClass: styles.input_group, messageClass: styles.valid_message });
  }
  addEvents() {
    this._element!.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', this.props.events.submit);
    });
  }
}