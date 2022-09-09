import ErrorLayout from '../../layout/error/errorLayout';
import Link from '../../components/link/Link';
import * as styleError from '../../layout/error/style.module.css';
import * as styleLink from '../../components/link/style.module.css';

export const ErrorPage = new ErrorLayout('div', {
  attr: {
    class: styleError.wrapper,
  },
  errorCode: '404',
  errorMessege: 'Не туда попали',
  link: new Link('a', {
    attr: {
      class: styleLink.link_block,
      href: '/chat',
    },
    label: 'Назад к чатам',
  }),
});

export const ServerErrorPage = new ErrorLayout('div', {
  attr: {
    class: styleError.wrapper,
  },
  errorCode: '500',
  errorMessege: 'Мы уже фиксим',
  link: new Link('a', {
    attr: {
      class: styleLink.link_block,
      href: '/chat',
    },
    label: 'Назад к чатам',
  }),
});
