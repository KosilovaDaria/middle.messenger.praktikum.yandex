import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatApi';
import { User } from '../../api/AuthApi';

export type ChatItemProps = {
  id: number;
  avatar?: string,
  title?: string,
  last_message?: {
    user?: User,
    time?: string,
    content?: string
  },
  unread_count?: number,
  selectedChat: ChatInfo;
  events?: {
    click: () => void
  }
}

export class ChatItemBase extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super({ ...props })
  }

  render() {
    const isSelected = this.props.id === this.props.selectedChat?.id
    return this.compile(tpl, {
      ...this.props, isSelected, styles,
    });
  }
}

export const withSelectedChat = withStore(state => ({ selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat) }))
const ChatItem = withSelectedChat(ChatItemBase)
export default ChatItem;
