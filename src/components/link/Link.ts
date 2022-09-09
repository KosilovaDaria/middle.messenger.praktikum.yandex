import Block from '../../utils/Block';
import tpl from './tpl.hbs';

export default class Link extends Block {
  render() {
    return this.compile(tpl, { ...this.props });
  }
  addEvents() {
    this._element!.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', this.props.events.click);
    });
  }
}
