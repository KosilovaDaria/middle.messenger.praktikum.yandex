import ChatLayout from '../../layout/chat/chatLayout';
import ChatList from '../../components/chatList/ChatList';
import ChatDialog from '../../components/chatDialog/ChatDialog';
import Message from '../../components/message/Message';
import Avatar from '../../components/avatar/Avatar';
import Link from '../../components/link/Link';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleMessage from '../../components/message/style.module.css';
import * as styleInput from '../../components/chatDialog/style.module.css';
import * as styleButton from '../../components/button/style.module.css';

import Router from '../../utils/Router';
import img from '../../assets/img/msg_rd.png';

const router = new Router('.app');

const list = new ChatList({
  avatar: new Avatar({}),
  from: 'Вадим',
  lastMessage: 'И Human Interface Guidelines и Material Design рекомендуют использовать средствами CSS ',
  date: 'Пт',
});

const messageFrom = new Message({
  text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
  time: '12:39',
  attr: { class: styleMessage.message_from },
});

const messageTo = new Message({
  img,
  text: 'Круто!',
  time: '12:39',
  attr: { class: styleMessage.message_to },
});

const dialog = new ChatDialog({
  avatar: new Avatar({
    attr: { class: styleAvatar.avatar_dialog },
  }),
  name: 'Вадим',
  date: '19 июня',
  messageFrom,
  messageTo,
  input: new Input({
    placeholder: 'Сообщение',
    name: 'message',
    attr: { class: styleInput.messege_input },
  }),
  button: new Button({
    type: 'button',
    label: '>',
    attr: { class: styleButton.button_round },
  }),
})

const ChatPage = new ChatLayout({
  link: new Link({
    label: 'Профиль >',
    events: {
      click: () => router.go('/profile'),
    },
  }),
  chatList: list,
  chatDialog: dialog,
});

export default ChatPage;
