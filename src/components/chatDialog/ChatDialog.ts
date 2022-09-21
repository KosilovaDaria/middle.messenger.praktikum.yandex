import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';
import attachBtn from '../../assets/img/attachBtn.png';
import Avatar from '../avatar/Avatar';
import Message from '../message/Message';
import Input from '../input/Input';
import Button from '../button/Button';

type ChatDialogProps = {
  avatar: Avatar,
  name: string,
  date: string,
  messageFrom?: Message,
  messageTo?: Message,
  input: Input,
  button: Button,
  img?: any,
  attr?: Record<string, string>
}
export default class ChatDialog extends Block<ChatDialogProps> {
  constructor(props: ChatDialogProps) {
    super({ ...props, img: attachBtn })
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
