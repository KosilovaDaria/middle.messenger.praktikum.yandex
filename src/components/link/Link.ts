import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

type LinkProps = {
  label: string,
  to?: string,
  attr?: Record<string, string>,
  events?: {
    click: () => void;
  }
}

export default class Link extends Block {
  constructor(props: LinkProps) {
    super({ ...props,
      // events: {
      //   click: () => this.navigate()
      // }
    });
  }
  render() {
    return this.compile(tpl, { ...this.props });
  }

  addEvents() {
    this._element!.querySelectorAll('span').forEach((a: any) => {
      a.addEventListener('click', this.props.events.click);
    });
  }
}
