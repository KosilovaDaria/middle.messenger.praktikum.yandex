import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

type AvatarProps = {
  attr?: Record<string, string>;
  path?: string;
  events?:{
    click:() => {}
  }
}

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props })
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
