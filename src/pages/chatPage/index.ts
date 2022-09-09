import ChatLayout from '../../layout/chat/chatLayout';
import ChatList from '../../components/chatList/ChatList';
import ChatDialog from '../../components/chatDialog/ChatDialog';
import Message from '../../components/message/Message';
import Avatar from '../../components/avatar/Avatar';
import Link from '../../components/link/Link';
import Button from '../../components/button/Button';

import * as styleLayout from '../../layout/chat/style.module.css';
import * as styleList from '../../components/chatList/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import * as styleMessage from '../../components/message/style.module.css';

import img from '../../../dist/img/msg_rd.png';
import Input from '../../components/input/Input';

const list = new ChatList('li', {
  attr: {
    class: styleList.list_item,
  },
  avatar: new Avatar('div', {
    attr: {
      class: styleAvatar.avatar_chat,
    },
  }),
  from: 'Вадим',
  lastMessege: 'И Human Interface Guidelines и Material Design рекомендуют...',
  date: 'Пт',
});

const messegeFrom = new Message('div', {
  attr: {
    class: styleMessage.messege_from,
  },
  text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
  time: '12:39',
});

const messegeTo = new Message('div', {
  attr: {
    class: styleMessage.messege_to,
  },
  img,
  text: 'Круто!',
  time: '12:39',
});

const dialog = new ChatDialog('div', {
  attr: {
    class: styleLayout.dialog_block,
  },
  avatar: new Avatar('div', {
    attr: {
      class: styleAvatar.avatar_dialog,
    },
  }),
  name: 'Вадим',
  date: '19 июня',
  messegeFrom,
  messegeTo,
  input: new Input('input', {
    attr: {
      class: styleLayout.messege_input,
      placeholder: 'Сообщение',
      name: 'message',
    },
  }),
  button: new Button({
    attr: {
      class: styleButton.button_round,
      type: 'submit',
    },
    label: '>',
  }),
})

const ChatPage = new ChatLayout('div', {
  attr: {
    class: styleLayout.wrapper,
  },
  link: new Link('a', {
    label: 'Профиль >',
    attr: {
      href: '/profile',
    },
  }),
  chatList: list,
  chatDialog: dialog,
});

export default ChatPage;
