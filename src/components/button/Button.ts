import Block from "../../utils/Block";
import tpl from './tpl.hbs';

type ButtonProp = {
  label: string;
  attr: Record<string, any>,
  events: {
    click: (e) => void;
  }
}
export default class Button extends Block {
  constructor(props: ButtonProp ) {
    super("button", props);
  }

  render() {
    return this.compile(tpl, this.props);
  }

  // addEvents() {
  //   this._element.querrySelectorAll('button').forEach(btn => {
  //     btn.addEventListener('click', this.props.events.click);
  //   });
  // }
}



