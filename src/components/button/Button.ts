import Block from '../../utils/Block';
import tpl from './tpl.hbs';

type ButtonProp = {
  label: string;
  attr: Record<string, any>,
}

export default class Button extends Block {
  constructor(props:ButtonProp) {
    super('button', props);
  }
  render() {
    return this.compile(tpl, this.props);
  }
  addEvents() {
    this._element!.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', this.props.events.click);
    });
  }
}
