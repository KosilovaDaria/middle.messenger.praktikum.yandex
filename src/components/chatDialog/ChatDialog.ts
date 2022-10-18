import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import attachBtn from '../../assets/img/attachBtn.png';
import Avatar from '../avatar/Avatar';
import Message from '../message/Message';
import Input from '../input/Input';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Link from '../link/Link';
import styles from './style.module.css';
import styleLink from '../link/style.module.css';
import styleAvatar from '../avatar/style.module.css';
import styleButton from '../button/style.module.css';
import MessageController, { Message as MessageInfo } from '../../controllers/MessageController';
import store, { withStore } from '../../utils/Store';
import { getDate } from '../../utils/helpers';
import UserController from '../../controllers/UserController';
import ChatController from '../../controllers/ChatController';

type ChatDialogProps = {
  img?: any,
  selectedChat: number ;
  messages: MessageInfo[];
  userId: number;
}
class ChatDialogBase extends Block<ChatDialogProps> {
  constructor(props: ChatDialogProps) {
    super({ ...props, img: attachBtn })
  }
  init() {
    this.children.avatar = new Avatar({
      attr: { class: styleAvatar.avatar_dialog },
    });

    this.children.addUser = new Link({
      attr: { class: styleLink.link_block },
      label: 'Добавить пользователя',
      events: {
        click: () => {
          (this.children.modalAddUser as Block).setProps({ isOpen: true })
        },
      },
    })
    this.children.deleteChat = new Link({
      attr: { class: styleLink.link_delete },
      label: 'Удалить чат',
      events: {
        click: () => {
          ChatController.delete(store.getState().selectedChat);
        },
      },
    });

    this.children.modalAddUser = new Modal({
      title: 'Добавить пользователя',
      modalId: 'modal_chat',
      input: new Input({
        placeholder: 'Логин',
      }),
      close: new Button({
        label: 'x',
        attr: { class: styleButton.button_square },
        events: {
          click: () => {
            (this.children.modalAddUser as Block).setProps({ isOpen: false })
          },
        },
      }),
      button: new Button({
        label: 'Добавить',
        type: 'submit',
        events: {
          click: async () => {
            const input = this.children.modalAddUser.children.input as Input
            const userLogin = input.getValue();
            input.setValue('');
            const response = await UserController.fetchUsers(userLogin);
            await ChatController.addUserToChat(store.getState().selectChat, response.id);
            (this.children.modalAddUser as Block).setProps({ isOpen: false });
          },
        },
      }),
    })

    this.children.messages = this.createDialog(this.props)

    this.children.input = new Input({
      placeholder: 'Сообщение',
      name: 'message',
      attr: { class: styles.messege_input },
    });

    this.children.button = new Button({
      type: 'button',
      label: '>',
      attr: { class: styleButton.button_round },
      events: {
        click: () => {
          if (!this.props.selectedChat) {
            return
          }
          const input = this.children.input as Input
          const messageFromInput = input.getValue();
          input.setValue('')

          MessageController.sendMessage(this.props.selectedChat!, messageFromInput);
        },
      },
    });
  }
  componentDidUpdate(_oldProps: ChatDialogProps, newProps: ChatDialogProps): boolean {
    this.children.messages = this.createDialog(newProps);

    return true;
  }

  private createDialog(props: ChatDialogProps) {
    return props.messages.map(data => new Message({
      ...data,
      time: getDate(data!.time),

      isMyMsg: props.userId === data.user_id,
    }))
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
const withSelectedChatDialog = withStore(state => {
  const selectedChatId = state.selectedChat;
  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user?.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user?.id,
  };
});
const ChatDialog = withSelectedChatDialog(ChatDialogBase);
export default ChatDialog;
