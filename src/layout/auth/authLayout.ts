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
    // super('div');
    super({ ...props })
  }
  //создаем дочерние компоненты прямо внутри компонента не передавая с пропсами
  // init() {
  //   this.children.button = new Button({
  //     label: 'Авторизоваться',
  //     // attr: {
  //     //   // class: styleButton.button,
  //     //   type: 'submit',
  //     // },
  //   })
  // }
  render() {
    return this.compile(tpl, { ...this.props, styles });
  }
}
