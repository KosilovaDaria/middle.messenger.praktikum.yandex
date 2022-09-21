import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';
import Input from '../input/Input';
import Button from '../button/Button';
import ProfileInput from '../profileInput/ProfileInput';

type FormProps = {
  name: string,
  attr?: Record<string, string>,
  inputEmail?: Input | ProfileInput,
  inputLogin?: Input | ProfileInput,
  inputFirstName?: Input | ProfileInput,
  inputSecondName?: Input | ProfileInput,
  inputDisplayName?: Input | ProfileInput,
  inputPhone?: Input | ProfileInput,
  inputOldPass?: Input | ProfileInput,
  inputPass?: Input | ProfileInput,
  inputPassRpt?: Input | ProfileInput,
  button?: Button,
  events?: {
    submit: (e?: any) => void;
  }
}
export default class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ ...props })
  }
  render() {
    return this.compile(tpl, {
      ...this.props,
      styles,
      class: styles.input_group,
    });
  }

  addEvents() {
    this._element!.querySelectorAll('form').forEach((form: any) => {
      form.addEventListener('submit', this.props.events?.submit);
    });
  }
}
