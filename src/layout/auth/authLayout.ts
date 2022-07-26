import Block from '../../utils/Block';
import Form from '../../components/form/Form';
import Link from '../../components/link/Link';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

type AuthProps = {
  title: string,
  form: Form,
  link: Link,
}
export default class AuthLayout extends Block {
  constructor(props: AuthProps) {
    super({ ...props })
  }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
