import layout from '../../layout/error/tpl.hbs';
import link from '../../components/link';
import  './style.css';

export const ErrorPage = layout({
  errorCode: '404',
  errorMessege: 'Не туда попали',
  link: link('Назад к чатам', '', 'http://localhost:3000/chat')
});
export const ServerErrorPage = layout({
  errorCode: '500',
  errorMessege: 'Мы уже фиксим',
  link: link('Назад к чатам', '', 'http://localhost:3000/chat')
});

