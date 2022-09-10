import Block from '../../utils/Block';
import tpl from './tpl.hbs';

type LinkProps = {
  label: string,
  attr: Record<string, any>
}

export default class Link extends Block {
  constructor(props: LinkProps) {
    super('a', props);
  }
  render() {
    return this.compile(tpl, { ...this.props });
  }

  addEvents() {
    this._element!.querySelectorAll('a').forEach((a: any) => {
      a.addEventListener('click', this.props.events.click);
    });
  }
}
