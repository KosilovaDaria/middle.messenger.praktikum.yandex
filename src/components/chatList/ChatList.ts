import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Input from '../input/Input';
import ChatItem from '../chatItem/ChatItem';
import Link from '../link/Link';
import styles from './style.module.css';
import styleButton from '../button/style.module.css';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatApi';
import AuthController from '../../controllers/AuthController';
import ChatController from '../../controllers/ChatController';
import Router from '../../utils/Router';

const router = new Router('.app');

export type ChatListProps = {
  chats?: ChatInfo[],
  isLoaded?: boolean,
  noChats?: boolean,
  // time: string,
}
class ChatListBase extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  init() {
    AuthController.fetchUser()
    this.children.link = new Link({ label: 'Профиль >', events: { click: () => router.go('/profile') } })

    this.children.button = new Button({
      attr: { class: styleButton.button_square },
      label: '+',
      events: {
        click: () => {
          (this.children.modalBlock as Block).setProps({ isOpen: true })
        },
      },
    })

    this.children.modalBlock = new Modal({
      title: 'Создать новый чат',
      modalId: 'modal_chat',
      input: new Input({
        placeholder: 'Название чата',
      }),
      close: new Button({
        label: 'x',
        attr: { class: styleButton.button_square },
        events: {
          click: () => {
            (this.children.modalBlock as Block).setProps({ isOpen: false })
          },
        },
      }),
      button: new Button({
        label: 'Создать чат',
        type: 'submit',
        events: {
          click: () => {
            const { input } = this.children.modalBlock.children;
            const chatTitle = input.getValue();
            input.setValue('')
            ChatController.create(chatTitle);
            (this.children.modalBlock as Block).setProps({ isOpen: false })
          },
        },
      }),
    })
    this.children.chatItem = this.createChats(this.props)
  }
  componentDidUpdate(_oldProps: ChatListProps, newProps: ChatListProps): boolean {
    this.children.chatItem = this.createChats(newProps);

    return true;
  }
  private createChats(props: ChatListProps) {
    return props.chats!.map(data => new ChatItem({
      ...data,
      // last_message
      events: {
        click: () => {
          ChatController.selectChat(data.id);
        },
      },
    }))
  }

  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));
const ChatList = withChats(ChatListBase);
export default ChatList;
