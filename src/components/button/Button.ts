import Block from '../../utils/Block';
import tpl from './tpl.hbs';

type ButtonProps = {
  label: string;
  attr: Record<string, any>,
}

export default class Button extends Block {
  constructor(props:ButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }

  addEvents() {
    this._element!.querySelectorAll('button').forEach((btn: any) => {
      btn.addEventListener('click', this.props.events.click);
    });
  }
}
