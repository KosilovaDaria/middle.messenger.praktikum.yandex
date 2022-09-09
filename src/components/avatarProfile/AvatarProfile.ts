import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

export default class AvatarProfile extends Block {
  constructor(props: any) {
    super('div', props);
  }
  render() {
    return this.compile(tpl, { ...this.props, inputClass: styles.input, labelClass: styles.label });
  }
}
