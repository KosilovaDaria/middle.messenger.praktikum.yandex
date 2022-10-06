import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';
import * as styleButton from '../button/style.module.css';
import * as styleLink from '../link/style.module.css';
import Button from '../button/Button';
import Input from '../input/Input';

export type ModalProps = {
  isOpen?: boolean,
  title: string,
  label?: string,
  input?: Input,
  type? : string,
  modalId: string,
  close: Button,
  button: Button,
  events?: {
    submit: (e: Event) => void;
  };
}

export default class Modal extends Block<ModalProps> {
  constructor(props:ModalProps) {
    super({ ...props });
  }
  init() {

  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      styles,
      linkClass: styleLink.link_block,
      buttonClass: styleButton.button,
    });
  }
}
