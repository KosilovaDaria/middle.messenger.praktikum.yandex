import Block from '../../utils/Block';
import tpl from './tpl.hbs';

export default class Avatar extends Block {
  render() {
    return this.compile(tpl, this.props);
  }
}
