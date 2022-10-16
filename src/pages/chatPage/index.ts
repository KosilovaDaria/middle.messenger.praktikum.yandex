import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import styles from './style.module.css';
import ChatList from '../../components/chatList/ChatList';
import ChatDialog from '../../components/chatDialog/ChatDialog';
import Link from '../../components/link/Link';
import ChatController from '../../controllers/ChatController';
import { ModalProps } from '../../components/modal/Modal';

export default class ChatPage extends Block {
  constructor() {
    super({})
  }
  init() {
    this.children.chatList = new ChatList({ isLoaded: false, noChats: false })
    this.children.chatDialog = new ChatDialog({});
    this.children.link = new Link({
      label: 'Добавить новый чат',
      events: {
        click: () => {
          (this.children.modalBlock as Block).setProps({ isOpen: true })
        },
      },
    })

    ChatController.fetchChats().then(() => {
      if (this.children.chatList.props.chats.length == 0) {
        (this.children.chatList as Block).setProps({
          noChats: true,
        })
      } else {
        (this.children.chatList as Block).setProps({
          isLoaded: true,
        })
      }
    })
  }

  public componentDidUpdate(_oldProps: ModalProps, _newProps: ModalProps): boolean {
    return true
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
