import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

type MessageProps = {
  content: string,
  time: string,
  attr?: Record<string, string>,
  img?: any,
  isMyMsg: boolean;
}
export default class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
