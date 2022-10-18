import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import styles from './style.module.css';

type ButtonProps = {
  label: string;
  type? : 'submit' | 'button';
  attr?: Record<string, string>,
  events?: {
    click: () => void;
  };
}

export default class Button extends Block<ButtonProps> {
  constructor(props:ButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
