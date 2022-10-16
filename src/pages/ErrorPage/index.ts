// eslint-disable-next-line max-classes-per-file
import Link from '../../components/link/Link';
import styleLink from '../../components/link/style.module.css';

import Router from '../../utils/Router';
import Block from '../../utils/Block';
import tpl from '../../layout/error/tpl.hbs';
import styles from '../../layout/error/style.module.css';

const router = new Router('.app');

export class ErrorPage extends Block {
  constructor() {
    super({})
  }
  protected init() {
    this.props.errorCode = '404';
    this.props.errorMessage = 'Не туда попали';
    this.children.link = new Link({
      label: 'Назад к чатам',
      attr: { class: styleLink.link_block },
      events: {
        click: () => router.go('/messanger'),
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles })
  }
}
export class ServerErrorPage extends Block {
  constructor() {
    super({})
  }
  protected init() {
    this.props.errorCode = '500';
    this.props.errorMessage = 'Мы уже фиксим';
    this.children.link = new Link({
      label: 'Назад к чатам',
      attr: { class: styleLink.link_block },
      events: {
        click: () => router.go('/messanger'),
      },
    });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles })
  }
}
