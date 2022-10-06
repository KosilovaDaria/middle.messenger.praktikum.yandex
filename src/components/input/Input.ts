import Block from '../../utils/Block';
import * as styles from './style.module.css';
import tpl from './tpl.hbs';

type InputProps = {
  name?: string;
  type?: string;
  placeholder?: string;
  attr?: Record<string, string>,
  events?: {
    focus: (e?: any) => void;
    blur: (e?: any) => void;
  };
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }
  public setValue(value: string) {
    // eslint-disable-next-line no-return-assign
    return (this.element as HTMLInputElement).value = value;
  }
  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
