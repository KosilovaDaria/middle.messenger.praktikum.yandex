import Block from "../../utils/Block";
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

type FormProp = {
  events: {
    submit: (e) => void;
  }
}

export default class Form extends Block {
  render() {
    // console.log(this._element);
    return this.compile(tpl, {...this.props, mainClass:styles.input_group});
  }
  addEvents() {
    this._element!.querrySelectorAll('form').forEach(form => {
      form.addEventListener('submit', this.props.events.submit);
    });
  }
}