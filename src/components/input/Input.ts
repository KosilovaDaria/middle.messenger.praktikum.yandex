import Block from '../../utils/Block';
import * as styles from './style.module.css';
import tpl from './tpl.hbs';

type InputProps = {
  name: string;
  type?: string;
  placeholder: string;
  attr?: Record<string, string>
  events?: {
    focus: () => void;
    blur: () => void;
  };
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
