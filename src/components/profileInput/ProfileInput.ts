import Block from '../../utils/Block';
import Input from '../input/Input';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

type ProfileInputProps = {
  label: string,
  input: Input,
  attr?: Record<string, string>
}

export default class ProfileInput extends Block<ProfileInputProps> {
  constructor(props:ProfileInputProps) {
    super({ ...props });
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
