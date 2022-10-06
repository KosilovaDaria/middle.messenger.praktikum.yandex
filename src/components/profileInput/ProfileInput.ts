import Block from '../../utils/Block';
import Input from '../input/Input';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

type ProfileInputProps = {
  label: string,
  input: Input,
  linkClass?: any
  id?: string,
  attr?: Record<string, string>
}

export default class ProfileInput extends Block<ProfileInputProps> {
  constructor(props:ProfileInputProps) {
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
