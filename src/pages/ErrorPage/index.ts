import ErrorLayout from '../../layout/error/errorLayout';
import Link from '../../components/link/Link';
import * as styleError from '../../layout/error/style.module.css';
import * as styleLink from '../../components/link/style.module.css';

import Router from '../../utils/Router';

const router = new Router('.app');

export const ErrorPage = new ErrorLayout({
  errorCode: '404',
  errorMessege: 'Не туда попали',
  link: new Link({
    label: 'Назад к чатам',
    attr: { class: styleLink.link_block },
    events: {
      click: () => router.go('/messenger'),
    },
  }),
});

export const ServerErrorPage = new ErrorLayout({
  errorCode: '500',
  errorMessege: 'Мы уже фиксим',
  link: new Link({
    label: 'Назад к чатам',
    attr: { class: styleLink.link_block },
    events: {
      click: () => router.go('/messenger'),
    },
  }),
});
