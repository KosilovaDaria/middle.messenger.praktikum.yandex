import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';
import Avatar from '../avatar/Avatar';

type ChatListProps = {
  avatar: Avatar,
  from: string,
  lastMessage: string,
  date: string
}
export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props })
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
